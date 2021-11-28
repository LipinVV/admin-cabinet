import React, {useState} from "react";
import {userCard} from "../App";
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
        onSelectedUser(userData)
    }

    return (
        <div className='user-card'>
            {!redactorStatus ? <span>{userData.name}</span> :
                <label className='user-card__label'>
                    <input
                        className='user-card__input'
                        type='text'
                        value={newName}
                        onChange={(evt) => editNameHandleChanger(evt)}
                    />
                </label>
            }
            {!redactorStatus ? <span>{userData.email}</span> :
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
                    className='user-card__button'
                    onClick={() => {
                        handleUpdate();
                        setRedactorStatus(false);
                    }}>Сохранить
                </button>
                }
                {!redactorStatus &&
                <button
                    className='user-card__button'
                    onClick={() => setRedactorStatus(true)}>Изменить
                </button>
                }
                <button
                    onClick={handleUserModalPage}
                    className='user-card__button'>Задачи
                </button>
                <button
                    className='user-card__button'
                    onClick={handleDelete}>Удалить
                </button>
            </div>
        </div>
    )
}