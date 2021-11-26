import React from "react";
import {userCard} from "../App";

type paginationProps = {
    handleClickDecrease: () => void,
    handleClickIncrease: () => void,
    currentPage: number,
    users: userCard[],
    indexOfLastItem: number,
}

export const Pagination = ({handleClickDecrease, handleClickIncrease, currentPage, users, indexOfLastItem}: paginationProps) => {
console.log(indexOfLastItem, users.length)
    return (
        <div>
            <section className='pagination__control-buttons'>
                <button
                    className='pagination__control-button'
                    type='button'
                    onClick={handleClickDecrease}
                    disabled={currentPage === 1}
                >Previous page
                </button>
                <button
                    className='pagination__control-button'
                    type='button'
                    onClick={handleClickIncrease}
                    disabled={indexOfLastItem > users.length}
                >Next page
                </button>
                <span className='pagination__current-page'>current page is: {currentPage}</span>
            </section>
        </div>
    )
}