import React from "react";
import {userCard} from "../App";
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
            <div className='pagination__current-page'>Вы сейчас на: {currentPage} странице</div>
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