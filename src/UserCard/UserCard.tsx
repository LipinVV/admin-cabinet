import React, {useState} from "react";
import {userCard} from "../App";
import './userCard.scss';

interface userCardProps extends userCard {
    onDeleteUser: (id: number) => Promise<void>,
    onUpdateUser: (id: number, name: string, email: string) => Promise<void>,
}

export const UserCard = ({name, username, id, email, onDeleteUser, onUpdateUser}: userCardProps) => {

    const handleDelete = () => {
        return onDeleteUser(id)
    }

    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);

    const handleUpdate = () => {
        return onUpdateUser(id, newName, newEmail);
    }
    const [redactorStatus, setRedactorStatus] = useState(false);

    const editNameHandleChanger = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    }

    const editEmailHandleChanger = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(event.target.value);
    }

    return (
        <div className='userCard'>
            {!redactorStatus ? <span>{name}</span> :
                <input
                    type='text'
                    value={newName}
                    onChange={(evt) => editNameHandleChanger(evt)}
                />
            }
            {!redactorStatus ? <span>{email}</span> :
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
                <button className='userCard__button'>Подробнее</button>
            </span>
            <button className='userCard__button' onClick={handleDelete}>Удалить</button>
        </div>
    )
}