import React from "react";
import {userCard} from "../App";
import './userModalPage.scss';

type userModalPageProps = {
    userData: userCard,
    onClose: () => void,
}

export const UserModalPage = ({userData, onClose}: userModalPageProps) => {

    return (
        <div className='userModalPage'>
            <button onClick={onClose}>Закрыть</button>
            <div className='userModalPage__field'> userData: {userData.name}</div>
        </div>
    )
}