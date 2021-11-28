import React, {useState, useEffect} from "react";
import {userCard} from "../App";
import {UserCard} from "../UserCard/UserCard";
import {Pagination} from "../Pagination/Pagination";
import {UserModalPage} from "../UserModalPage/UserModalPage";
import './usersTemplate.scss';

type userProps = {
    users: userCard[],
    onDeleteUser: (id: number) => Promise<void>,
    onUpdateUser:  (id: number, name: string, email: string) => Promise<void>,
}

export const UsersTemplate = ({users, onDeleteUser, onUpdateUser}: userProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const PAGE_SIZE: number = 4;

    const indexOfLastItem = currentPage * PAGE_SIZE;
    const indexOfFirstItem = indexOfLastItem - PAGE_SIZE;
    const [filteredUsers, setFilteredUsers] = useState<userCard[]>([]);
    const currentUsersOnThePage = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const handleClickIncrease = () => {
        setCurrentPage(prevState => prevState + 1);
    }
    const handleClickDecrease = () => {
        setCurrentPage(prevState => prevState - 1);
    }

    useEffect(() => {
        setFilteredUsers(users);
    }, [users])

    useEffect(() => {
        if (currentUsersOnThePage.length === 0) {
            setCurrentPage(1);
        }
    }, [currentUsersOnThePage])

    const inputFilterHandler = (inputValue: string, allUsers: userCard[]) => {
        const filteredArray = allUsers.filter((user: userCard) => {
            if (inputValue === '') {
                return user;
            }
            if (user.name.toLowerCase().includes(inputValue.toLowerCase())) {
                return user;
            }
        })
        setFilteredUsers(filteredArray);
    }

    const [selectedUserData, setSelectedUserData] = useState<userCard | undefined>(undefined);

    const onSelectedUser = (userData: userCard) => {
        setSelectedUserData(userData);
    }

    const onCloseSelectedUser = () => {
        setSelectedUserData(undefined);
    }

    return (
        <div className='users-template'>
            <h1 className='users-template__header'>Поиск сотрудников</h1>
            <label className='users-template__label'>
                <input
                    className='users-template__input'
                    type='text'
                    placeholder='Поиск по имени...'
                    onChange={event => inputFilterHandler(event.target.value, users)}
                />
            </label>
            <section className='users-template__template'>
                {currentUsersOnThePage.map((user: userCard) => {
                    return (
                        <UserCard
                            key={user.id}
                            userData={user}
                            onDeleteUser={onDeleteUser}
                            onUpdateUser={onUpdateUser}
                            onSelectedUser={onSelectedUser}
                        />
                    )
                })}
            </section>
            <Pagination
                handleClickDecrease={handleClickDecrease}
                handleClickIncrease={handleClickIncrease}
                currentPage={currentPage}
                indexOfLastItem={indexOfLastItem}
                users={users}
            />
            {selectedUserData && <UserModalPage userData={selectedUserData} onClose={onCloseSelectedUser}/>}
        </div>
    )
}