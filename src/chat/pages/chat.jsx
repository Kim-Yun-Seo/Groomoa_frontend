import React from 'react';
import { ToastContainer } from "react-toastify";

import ChatContainer from '../containers/Chat';

import style from './page.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {
    return (
        <div className={style.Page}>
            <ChatContainer /> 
            <ToastContainer/>
        </div>
    );
}

export default Chat;
