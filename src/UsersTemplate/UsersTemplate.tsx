import React, {useState, useEffect} from "react";
import {userCard} from "../App";
import {UserCard} from "../UserCard/UserCard";
import {Pagination} from "../Pagination/Pagination";
import './usersTemplate.scss';

type userProps = {
    users: userCard[],
    onDeleteUser: (id: number) => Promise<void>,
}

export const UsersTemplate = ({users, onDeleteUser}: userProps) => {

    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 4;

    const indexOfLastItem = currentPage * PAGE_SIZE;
    const indexOfFirstItem = indexOfLastItem - PAGE_SIZE;
    const [filteredUsers, setFilteredUsers] = useState<userCard[]>([]);
    const currentPhotosOnThePage = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

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

    }, [currentPhotosOnThePage])


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
                    placeholder='Search by a name...'
                    onChange={evt => inputFilterHandler(evt.target.value, users)}
                />
            </label>
            <section className='users'>
                {currentPhotosOnThePage.map((user: userCard) => {
                    return (
                        <UserCard
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            username={user.username}
                            email={user.email}
                            address={user.address}
                            geo={user.geo}
                            phone={user.phone}
                            website={user.website}
                            company={user.company}
                            onDeleteUser={onDeleteUser}
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