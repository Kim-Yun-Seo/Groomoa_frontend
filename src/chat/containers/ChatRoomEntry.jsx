import { useNavigate } from "react-router-dom";

import ChatRoomEntryComp from '../components/ChatRoomEntry';

const ChatRoomEntry = () => {
    const navigate = useNavigate();
    const enterChatRoom = ({nickname, chatRoomId}) => {
        navigate(`/chat-room/${chatRoomId}/${nickname}`)
    }
    
    return <ChatRoomEntryComp enterChatRoom={enterChatRoom} />
}

export default ChatRoomEntry;
