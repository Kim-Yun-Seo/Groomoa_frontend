import goormImage from '../images/goorm.svg';
import goorm_connect from '../images/goorm_connect.svg';
import userImage from "../images/userImage.png";
import memberDate from "../images/memberDate.svg";
import UtcTosimple from '../functions/UtcTosimple';
import css from './Goorm.module.css';
import { useState } from 'react';


const Goorm = ({ value }) => {
  const imageURL = localStorage.getItem("userIcon");
  const [ userId, setUserId ] = useState("goorm_kim");
  const [ username, setUsername] = useState("김구름");
  const { group_id, group_name, group_host, end_date, group_limit, group_user_list } = value;

  // 관심있어요 여부 가져오기
  const numParty = group_user_list.length;
  return (
    <div className={css.ImageComp}>
      <div className={css.goorm_head}>
        <img className={css.goorm} src={goormImage} alt="goorm_Image" />
        <p className={css.Title}>{group_name}</p>
      </div>
      <img src={goorm_connect} className={css.goormconnect} />
      
      <div className={css.TextComp}>
        <div className={css.profile}>
          <img className={css.userIcon} src={userImage}></img>
          <div className={css.textData}>
            <p className={css.id}>@{userId}</p>
            <p className={css.name}>{username}</p>
          </div>
        </div>
      </div>
      <div className={css.memberData}>
        <img src={memberDate}></img>
        <div className={css.memberDateInfo}>
          <p className={css.memberInfo}>8/12 참여중!</p>
          <p className={css.dateInfo}>~10/19</p>
        </div>
      </div>
    </div>
  );
};

export default Goorm;