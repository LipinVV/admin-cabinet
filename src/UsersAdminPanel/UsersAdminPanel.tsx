import React, {useState} from "react";

export const UsersAdminPanel = ({onAddUser}: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        onAddUser(name, email);
        setName('');
        setEmail('');
    }

    return (
        <div>
            <h1>Панель администратора</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder='name'
                        type='text'
                        name='name'
                    />
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder='email'
                        type='text'
                        name='email'/>
                    <button
                        type='button'
                        onClick={(event: React.SyntheticEvent) => {
                            handleSubmit(event)
                        }}>Добавить сотрудника
                    </button>
                </form>
            </div>
        </div>
    )
}