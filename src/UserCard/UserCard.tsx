import React from "react";
import {userCard} from "../App";
import './userCard.scss';


export const UserCard = ({name, username, id, email}: userCard) => {


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