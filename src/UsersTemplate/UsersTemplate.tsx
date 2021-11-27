import React, {useState, useEffect} from "react";
import {userCard} from "../App";
import {UserCard} from "../UserCard/UserCard";
import {Pagination} from "../Pagination/Pagination";
import './usersTemplate.scss';

type userProps = {
    users: userCard[],
    onDeleteUser: (id: number) => Promise<void>,
    onUpdateUser:  (id: number, name: string, email: string) => Promise<void>,
}

export const UsersTemplate = ({users, onDeleteUser, onUpdateUser}: userProps) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const PAGE_SIZE = 3;

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
        setFilteredUsers(users)
    }, [users])

    useEffect(() => {
        if (currentUsersOnThePage.length === 0) {
            setCurrentPage(1);
        }
    }, [currentUsersOnThePage])
    console.log(currentUsersOnThePage.length, PAGE_SIZE)

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

    return (
        <div className=''>
            <h1>Поиск сотрудников</h1>
            <label className='users__search-input'>
                <input
                    type='text'
                    placeholder='Поиск по имени...'
                    onChange={evt => inputFilterHandler(evt.target.value, users)}
                />
            </label>
            <section className='users'>
                {currentUsersOnThePage.map((user: userCard) => {
                    return (
                        <UserCard
                            id={user.id}
                            key={user.id}
                            geo={user.geo}
                            name={user.name}
                            email={user.email}
                            phone={user.phone}
                            website={user.website}
                            address={user.address}
                            company={user.company}
                            username={user.username}
                            onDeleteUser={onDeleteUser}
                            onUpdateUser={onUpdateUser}
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
        </div>
    )
}