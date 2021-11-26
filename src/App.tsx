import React, {useEffect, useState} from 'react';
import {UsersTemplate} from "./UsersTemplate/UsersTemplate";
import {PhotoConstructor} from "./UsersAdminPanel/UsersAdminPanel";
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
            await fetch(`https://jsonplaceholder.typicode.com/albums/1/photos?id=${id}`, {
                method: 'DELETE'
            })
                .then((response: any) => {
                    if (response.status !== 201) {
                        return
                    } else {
                        setUsers(users.filter(photo => {
                            return photo.id !== id;
                        }))
                    }
                })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="App">
            <PhotoConstructor onAddUser={onAddUser} users={users}/>
            <UsersTemplate users={users} onDeleteUser={onDeleteUser} />
        </div>
    );
}

export default App;

