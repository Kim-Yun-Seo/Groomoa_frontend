import goormImage from '../images/goorm.svg';
import goorm_connect from '../images/goorm_connect.svg';
import userImage from "../images/userImage.png";
import memberDate from "../images/memberDate.svg";
import UtcTosimple from '../functions/UtcTosimple';
import css from './Goorm.module.css';
import { useState } from 'react';


const Goorm = ({ value }) => {
  const userId = localStorage.getItem("userId");
  const { groupId, groupTitle, host, closeDate, maxCount, currentCount } = value;

  return (
    <div className={css.ImageComp}>
      <div className={css.goorm_head}>
        <img className={css.goorm} src={goormImage} alt="goorm_Image" />
        <p className={css.Title}>{groupTitle}</p>
      </div>
      <img src={goorm_connect} className={css.goormconnect} />
      
      <div className={css.TextComp}>
        <div className={css.profile}>
          <img className={css.userIcon} src={userImage}></img>
          <div className={css.textData}>
          </div>
        </div>
      </div>
      <div className={css.memberData}>
        <img src={memberDate}></img>
        <div className={css.memberDateInfo}>
          <p className={css.memberInfo}>{currentCount}/{maxCount} 참여중!</p>
          <p className={css.dateInfo}>~{closeDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Goorm;