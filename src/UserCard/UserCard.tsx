import React, {useState} from "react";
import {userCard} from "../App";
import './userCard.scss';
import {UserModalPage} from "../UserModalPage/UserModalPage";

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
        <div className='userCard'>
            {!redactorStatus ? <span>{userData.name}</span> :
                <input
                    type='text'
                    value={newName}
                    onChange={(evt) => editNameHandleChanger(evt)}
                />
            }
            {!redactorStatus ? <span>{userData.email}</span> :
                <input
                    type='text'
                    value={newEmail}
                    onChange={(evt) => editEmailHandleChanger(evt)}
                />
            }
            <span className='userCard__buttons'>
                {redactorStatus &&
                <button
                    className='userCard__button'
                    onClick={() => {
                        handleUpdate();
                        setRedactorStatus(false);
                    }}>Сохранить
                </button>
                }
                {!redactorStatus &&
                <button
                    className='userCard__button'
                    onClick={() => setRedactorStatus(true)}>Редактировать
                </button>
                }
                <button onClick={handleUserModalPage} className='userCard__button'>Подробнее</button>
            </span>
            <button className='userCard__button' onClick={handleDelete}>Удалить</button>
        </div>
    )
}