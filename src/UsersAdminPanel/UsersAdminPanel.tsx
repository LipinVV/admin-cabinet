import React, {useState} from "react";

export const PhotoConstructor = ({onAddUser}: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        onAddUser(name, email);
    }

    return (
        <div>
            <h1>PhotoRedactor</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <h4>Добавить фото</h4>
                    <input
                        onChange={(event) => setName(event.target.value)}
                        placeholder='name'
                        type='text'
                        name='name'
                    />
                    <input
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder='email'
                        type='text'
                        name='email'/>
                    <button type='button' onClick={(event: React.SyntheticEvent) => {
                        handleSubmit(event)
                    }}>Добавить
                    </button>
                </form>
            </div>
        </div>
    )
}