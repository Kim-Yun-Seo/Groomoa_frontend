import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';

import style from './Message.module.scss';

const Message = ({userId, text, showName, myId}) => {
    const isMyMessage = userId === myId;
        
    return (
        <ListItem className={isMyMessage? style.Message__my__wrapper : null}>
            <Stack>
                {showName && <div>{userId}</div>}
                <div className={isMyMessage? style.Message__my : style.Message__other}>{text}</div>
            </Stack>
        </ListItem>
                    
    );
}

export default Message;