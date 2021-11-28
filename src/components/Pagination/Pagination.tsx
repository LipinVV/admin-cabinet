import React from 'react';
import {userCard} from '../../services/user';
import './pagination.scss';

type paginationProps = {
    handleClickDecrease: () => void,
    handleClickIncrease: () => void,
    currentPage: number,
    users: userCard[],
    indexOfLastItem: number,
}

export const Pagination = ({handleClickDecrease, handleClickIncrease, currentPage, users, indexOfLastItem}: paginationProps) => {

    return (
        <div className='pagination'>
            <h1 className='pagination__current-page'>Вы сейчас на {currentPage} странице</h1>
            <section className='pagination__control-buttons'>
                <button
                    className='pagination__control-button'
                    type='button'
                    onClick={handleClickDecrease}
                    disabled={currentPage === 1}
                >Назад
                </button>
                <button
                    className='pagination__control-button'
                    type='button'
                    onClick={handleClickIncrease}
                    disabled={indexOfLastItem >= users.length}
                >Далее
                </button>
            </section>
        </div>
    )
}