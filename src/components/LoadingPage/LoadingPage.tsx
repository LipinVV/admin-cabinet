import React from "react";
import {Ring} from 'react-spinners-css';
import './loadingPage.scss';

type loadingPageProps = {
    pageSize: number,
}

export const LoadingPage = ({pageSize}: loadingPageProps) => {
    const loadingTemplate = Array(pageSize).fill('').map((element, index) => index + 1);

    return (
        <div className='loading-cards'>
            <h1 className='loading-cards__header'>Загружаем данные</h1>
            <section className='loading-cards__cards'>
                {loadingTemplate.map(card => <div className='loading-cards__card' key={card}> </div>)}
            </section>
            <Ring color='gold' className='loading-cards__spinner'/>
        </div>
    )
}