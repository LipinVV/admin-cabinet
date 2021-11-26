import React from "react";
import {userCard} from "../App";
import './userCard.scss';

interface userCardProps extends userCard  {
    onDeleteUser: (id: number) => Promise<void>,
}

export const UserCard = ({name, username, id, email, onDeleteUser}: userCardProps) => {

    const handleDelete = () => {
        return onDeleteUser(id)
    }

    return (
        <div className='userCard'>
            <span>{id}</span>
            <span>{name}</span>
            <span>{username}</span>
            <span>{email}</span>
            <span>
                <button>Изменить</button>
                <button >Удалить</button>
            </span>
        </div>
    )
}