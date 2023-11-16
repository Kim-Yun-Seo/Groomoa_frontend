import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import ChatComp from '../components/Chat';
import { SocketContext } from '../contexts/SocketContext';

const Chat = () => {
    const { roomId, userId } = useParams();
    const { joinRoom, sendMessage, updateMessage } = useContext(SocketContext);
    const [ messages, setMessages ] = useState([]);
    const navigate = useNavigate();
    
    const addMessage = (message) => {
        setMessages((prev) => prev.concat(message));
    }
        
    useEffect(() => {
        try {
            joinRoom({userId, roomId});
            updateMessage(addMessage);
        } catch {
            navigate('/');
        }
    }, []);
    
    const submitMessage = (message) => {
        if(message.trim()) {
            sendMessage({roomId, userId, message});
        } else {
            toast.error("메세지를 입력해주세요.")
        }
        
    }
    
    return (<ChatComp submitMessage={submitMessage} messages={messages} myId={userId}/>);
}

export default Chat;
