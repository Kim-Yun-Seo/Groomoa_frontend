import css from './Mainmydata.module.css'
import userImage from "../images/userImage.png";
import underLine from '../images/mydataUnderLine.svg'
import { useState } from 'react';

const Mainmydata = () => {

    const imageURL = localStorage.getItem("userIcon");
    const [ userId, setUserId ] = useState("goorm_kim");
    const [ username, setUsername] = useState("김구름");
    const [ follow, setFollow ] = useState({
        following : 563,
        follower : 239
    });
    // 팔로워 수가 많을때도 고려해야함 -> 1.3만, 107.6만 등등...
    return (
        <div className={css.dataList}>
            <div className={css.profile}>
                <img className={css.userIcon} src={userImage}></img>
                <div className={css.textData}>
                    <p className={css.id}>@{userId}</p>
                    <p className={css.name}>{username}</p>
                </div>
            </div>
            <div className={css.follow}>
                    <p className={css.texts}>팔로잉<span>{follow.following}</span></p>
                    <p className={css.texts}>팔로워<span>{follow.follower}</span></p>
            </div>
            <div className={css.underLine}>
                <img src={underLine}></img>
            </div>
            <div>
                <ul className={css.following}>
                </ul>
            </div>
        </div>
    )
}
export default Mainmydata;