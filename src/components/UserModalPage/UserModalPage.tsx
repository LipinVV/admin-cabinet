import React, {useContext, useState} from 'react';
import {userCard} from '../../services/user';
import './userModalPage.scss';
import {ACTION, StoreContext} from '../../Storage/Storage';
import {taskType} from '../../services/tasks';

type userModalPageProps = {
    userData: userCard,
    onClose: () => void,
}

export const UserModalPage = ({userData, onClose}: userModalPageProps) => {
    const { state, dispatch } = useContext(StoreContext);
    const tasksByUsers = state.tasks.filter(task => task.userId === userData.id);
    const [task, setTask] = useState<taskType>({name: '', description: '', userId: 0});


    return (
        <div className='userModalPage'>
            <button onClick={onClose}>Закрыть</button>
            <div>
                <input onChange={(event) => setTask({...task, name: event.target.value, userId: userData.id})}/>Task
                <input onChange={(event) => setTask({...task, description: event.target.value,  userId: userData.id})}/>Description
                <button onClick={() => dispatch({action: ACTION.SET_TASK, data: task})}>Create</button>
            </div>
            {tasksByUsers.map(task => {
                return (
                    <div key={task.userId}>
                        <span>{task.name}</span>
                        {task.description}
                    </div>
                )
            })}
            <div className='userModalPage__field'> userData: {userData.name}</div>
        </div>
    )
}