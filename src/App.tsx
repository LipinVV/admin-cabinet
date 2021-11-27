import React, {useEffect, useState} from 'react';
import {UsersTemplate} from "./UsersTemplate/UsersTemplate";
import {UsersAdminPanel} from "./UsersAdminPanel/UsersAdminPanel";
import {LoadingPage} from "./LoadingPage/LoadingPage";
import './App.scss';

export interface userCard {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: number,
    },
    geo: {
        lat: number,
        lng: number,
    },
    phone: number,
    website: string,
    company: {
        name: string,
        catchphrase: string,
        bs: string,
    }
}

function App() {
    const [users, setUsers] = useState<userCard[]>([]);

    const fetchUsers = async () => {
        try {
            await fetch('https://jsonplaceholder.typicode.com/users')
                .then((response: any) => response.json())
                .then((data: userCard[]) => setUsers(data));
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const onAddUser = async (name: string, email: string) => {
        try {
            await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then((response: any) => {
                    if (response.status !== 201) {
                        return
                    } else {
                        return response.json();
                    }
                })
                .then((data: userCard) => {
                    const dataWithCorrectedId = {...data, id: users.length + 1};
                    setUsers(prevState => [...prevState, dataWithCorrectedId])
                })
        } catch (error) {
            console.error(error)
        }
    }


    const onDeleteUser = async (id: number) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'DELETE'
            })
                .then((response: any) => {
                    if (response.status !== 200) {
                        return
                    } else {
                        setUsers(users.filter(user => {
                            return user.id !== id;
                        }))
                    }
                })
        } catch (error) {
            console.error(error)
        }
    }


    const onUpdateUser = async (id: number, name: string, email: string) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: name,
                    email: email,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            })
                .then((response: any) => {
                    if (response.status) {
                        setUsers(users.map(user => {
                            if (user.id === id) {
                                return {
                                    ...user, name: name, email: email
                                }
                            }
                            return user;
                        }))
                    }
                })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="App">
            <UsersAdminPanel
                onAddUser={onAddUser}
            />
            {users.length !== 0 ?
                <UsersTemplate
                    users={users}
                    onDeleteUser={onDeleteUser}
                    onUpdateUser={onUpdateUser}
                />
                :
                <LoadingPage/>
            }
        </div>
    );
}

export default App;

