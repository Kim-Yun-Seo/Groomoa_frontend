import Upperbar from "./Upperbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Groups from "./Groups";
import css from "./Mypage.module.css";
import userImage from "../images/users/user1.svg"

const Mypage = () => {
  //temp
  const userIcon = userImage;

  const movePage = useNavigate();
  const authToken = localStorage.getItem("key");
  const [userInfo, setUserInfo] = useState({
    "profileId": 10,
    "userInfo": {
      "userId": 11,
      "userEmail": "11",
      "userName": "김정목"
    },
    "profileInfo": {
      "profileImg": userIcon,
      "interestings": null
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.125.111.84:8081/profile', {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserInfo(data);
        console.log(userInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const [followings, setFollowings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.125.111.84:8081/follow/following', {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await JSON.parse(response);
        setFollowings(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [])

  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.125.111.84:8081/follow/follower', {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFollowers(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const isMe = useEffect(() => {
    //지금 로그인 유저가 이 페이지의 userid와 같은지 확인한다.
    //지금 로그인 유저에 대한 정보가 필요함 
    //localstorage에 userId나 userEmail 갖다넣고 쓰자

    const now = '' //현재 로그인 유저

    if (now === userInfo.userInfo.userEmail) {
      return false;
    }
  },[])

  return (
    <div className="pageSize">
      <Upperbar />
      <div className={css.myPage}>
        <div className={css.myData}>
          <div className={css.myDataProfile}>
            <img className={css.myDataImg} src={userInfo.profileInfo.profileImg}></img>
            <div className={css.textData}>
              <p className={css.id}>@{userInfo.userInfo.userEmail}</p>
              <p className={css.name}>{userInfo.userInfo.userName}</p>
              <div className={css.follow}>
                <p className={css.texts}
                  onClick={
                    () => { console.log('팔로잉 목록 =',) }
                  }>팔로잉<span>{followings.length}</span></p>
                <p className={css.texts}
                  onClick={
                    () => { console.log('팔로우 목록 =',) }
                  }>팔로워<span>{followers.length}</span></p>
              </div>
            </div>
            <div>
              <button className={css.followBtn} style={{ visibility: isMe ? "hidden" : "visible" }}
                onClick={() => {
                  console.log('팔로우 기능 구현 =',)
                }}>팔로우</button>
            </div>
          </div>
          <div className={css.interest}>
            <p className={css.interestTitle}>관심사</p>
            <div className={css.interestCategory}>
              <p className={css.category}>게임</p>
              <p className={css.category}>프로젝트</p>
            </div>
          </div>
        </div>
        <div className={css.groupData}>
          <div>
            <button className={css.groupBtn} onClick={() => console.log('구름 필터링 =',)}>모집한 구름</button>
            <button className={css.groupBtn} onClick={() => console.log('구름 필터링 =',)}>참가한 구름</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mypage;