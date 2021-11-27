import React from "react";
import {Ring} from 'react-spinners-css';
import './loadingPage.scss';

export const LoadingPage = () => {
    const loadingTemplate = Array(3).fill('').map((element, index) => index + 1);

    return (
        <div className='loading-cards'>
            <h1 className='loading-cards__header'>Загружаем данные</h1>
            <section className='loading-cards__cards'>
                {loadingTemplate.map(card => <div className='loading-cards__card' key={card}> </div>)}
            </section>
            <Ring color='red' className='loading-cards__spinner'/>
        </div>
    )
}