import { useEffect, createContext } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {
    let socket;
    const CHATSERVER = "https://chattingappexampleserver.run.goorm.site/";
    useEffect(()=>{
        socket = io(CHATSERVER);
        return () => {
            socket.disconnect();
        }
    }, [])
    
    const joinRoom = ({roomId, userId}) => {
        socket.emit('JOIN_ROOM', {userId, roomId}); 
    }
    
    const sendMessage = ({roomId, userId, message}) => {
        socket.emit('SEND_MESSAGE', {roomId, userId, message});
    }
    
    const updateMessage = (func) => {
        socket.on('UPDATE_MESSAGE', (msg) => func(msg));
    }
    
    return (
        <SocketContext.Provider value={{joinRoom, sendMessage, updateMessage}}>
            {children}
        </SocketContext.Provider>
    );
}