import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Storage} from "./Storage/Storage";
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <Storage>
            <App/>
        </Storage>
    </React.StrictMode>,
    document.getElementById('root')
);
