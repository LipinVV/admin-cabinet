import React, {useState} from "react";
import './usersAdminPanel.scss';

type usersAdminPanelProps = {
    onAddUser: (name: string, email: string) => Promise<void>,
}

export const UsersAdminPanel = ({onAddUser}: usersAdminPanelProps) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        onAddUser(name, email);
        setName('');
        setEmail('');
    }

    const errors = {name: 'минимальная длина имени - 3 буквы', email: 'введите корректный формат email'};
    const userDataCondition = (name: string, email: string) => {
        return name.length < 4 || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    }

    return (
        <div className='admin-panel'>
            <h1 className='admin-panel__header'>Панель администратора</h1>
            <form
                className='admin-panel__form'
                onSubmit={handleSubmit}
            >
                <label className='admin-panel__label'>
                    <input
                        className='admin-panel__input'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder='имя сотрудника'
                        type='text'
                        name='name'
                    />
                </label>
                {name.length < 4 && name.length > 0 && <span className='admin-panel__warning'>{errors.name}</span>}
                <label className='admin-panel__label'>
                    <input
                        className='admin-panel__input'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder='email сотрудника'
                        type='text'
                        name='email'/>
                </label>
                {!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && email.length > 0 && <span className='admin-panel__warning'>{errors.email}</span>}
                <button
                    className='admin-panel__add-user-button'
                    disabled={Boolean(userDataCondition(name, email))}
                    type='submit'
                    onClick={(event: React.SyntheticEvent) => {
                        handleSubmit(event)
                    }}>Добавить сотрудника
                </button>
            </form>
        </div>
    )
}