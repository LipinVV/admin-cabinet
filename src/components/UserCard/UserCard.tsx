import React, {useState} from 'react';
import {userCard} from '../../services/user';
import './userCard.scss';

interface userCardProps {
    userData: userCard,
    onDeleteUser: (id: number) => Promise<void>,
    onUpdateUser: (id: number, name: string, email: string) => Promise<void>,
    onSelectedUser: (userData: userCard) => void,
}

export const UserCard = ({userData, onDeleteUser, onUpdateUser, onSelectedUser}: userCardProps) => {

    const handleDelete = () => {
        return onDeleteUser(userData.id)
    }

    const [newName, setNewName] = useState(userData.name);
    const [newEmail, setNewEmail] = useState(userData.email);

    const handleUpdate = () => {
        return onUpdateUser(userData.id, newName, newEmail);
    }
    const [redactorStatus, setRedactorStatus] = useState(false);

    const editNameHandleChanger = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    }

    const editEmailHandleChanger = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(event.target.value);
    }

    const handleUserModalPage = () => {
        onSelectedUser(userData);
    }

    const [onDeleteConfirmation, setOnDeleteConfirmation] = useState(false);

    return (
        <div className='user-card'>
            {!redactorStatus ? <p className='user-card__user-credentials'>{userData.name}</p> :
                <label className='user-card__label'>
                    <input
                        className='user-card__input'
                        type='text'
                        value={newName}
                        onChange={(evt) => editNameHandleChanger(evt)}
                    />
                </label>
            }
            {!redactorStatus ? <p className='user-card__user-credentials'>{userData.email}</p> :
                <label className='user-card__label'>
                    <input
                        className='user-card__input'
                        type='text'
                        value={newEmail}
                        onChange={(evt) => editEmailHandleChanger(evt)}
                    />
                </label>
            }
            <div className='user-card__buttons'>
                {redactorStatus &&
                <button
                    type='button'
                    className='user-card__button'
                    onClick={() => {
                        handleUpdate();
                        setRedactorStatus(false);
                    }}>Сохранить
                </button>
                }
                {!redactorStatus &&
                <button
                    type='button'
                    className='user-card__button'
                    onClick={() => setRedactorStatus(true)}>Изменить
                </button>
                }
                <button
                    type='button'
                    onClick={handleUserModalPage}
                    className='user-card__button'>Задачи
                </button>
                {!onDeleteConfirmation && <button
                    type='button'
                    className='user-card__button'
                    onClick={() => setOnDeleteConfirmation(true)}>Удалить
                </button>}
                {onDeleteConfirmation && <div className='user-card__confirmation-buttons'>
                    <button
                        className='user-card__confirmation-button'
                        type='button'
                        onClick={handleDelete}>Да</button>
                    <button
                        className='user-card__confirmation-button'
                        type='button'
                        onClick={() =>setOnDeleteConfirmation(false)}>Отмена</button>
                </div>}
            </div>
        </div>
    )
}