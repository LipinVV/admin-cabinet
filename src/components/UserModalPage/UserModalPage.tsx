import React, {useContext, useState} from 'react';
import {userCard} from '../../services/user';
import {ACTION, StoreContext} from '../../Storage/Storage';
import {taskType} from '../../services/tasks';
import './userModalPage.scss';

type userModalPageProps = {
    userData: userCard,
    onClose: () => void,
}

export const UserModalPage = ({userData, onClose}: userModalPageProps) => {
    const {state, dispatch} = useContext(StoreContext);
    const tasksByUsers = state.tasks.filter(task => task.userId === userData.id);
    const [task, setTask] = useState<taskType>({name: '', description: '', userId: 0});
    const errors = {name: 'Укажите минимум 7 символов', description: 'Укажите минимум 10 символов'};

    return (
        <div className='user-modal-page'>
            <h1 className='user-modal-page__header'>Сотрудник: {userData.name}</h1>
            <label className='user-modal-page__label'>Укажите название задачи
                <input
                    value={task.name}
                    className='user-modal-page__input'
                    onChange={(event) => setTask({...task, name: event.target.value, userId: userData.id})}
                />
            </label>
            {task.name.length < 7 && task.name.length > 0 && <span className='user-modal-page__warning'>{errors.name}</span>}
            <label className='user-modal-page__label'>Укажите описание задачи
                <textarea
                    value={task.description}
                    className='user-modal-page__text-area'
                    onChange={(event) => setTask({...task, description: event.target.value, userId: userData.id})}
                />
            </label>
            {task.description.length < 10 && task.description.length > 0 &&<span className='user-modal-page__warning'>{errors.description}</span>}
            <button
                disabled={task.name.length < 7 || task.description.length < 10}
                className='user-modal-page__create-button'
                onClick={() => {
                    dispatch({action: ACTION.SET_TASK, data: task});
                    setTask({name: '', description: '', userId: 0});
                }}>Создать</button>
            {tasksByUsers.map(task => {
                return (
                    <div
                        className='user-modal-page__task'
                        key={task.name}
                    >
                        <h3>Поставленная задача:</h3>
                        <span className='user-modal-page__task-name'>Название: {task.name}</span>
                        <span className='user-modal-page__task-description'>Описание: {task.description}</span>
                    </div>
                )
            })}
            <button
                className='user-modal-page__close-button'
                onClick={onClose}>Закрыть
            </button>
        </div>
    )
}