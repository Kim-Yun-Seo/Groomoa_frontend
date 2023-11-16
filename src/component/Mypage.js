import Upperbar from "./Upperbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Groups from "./Groups";
import userImage from "../images/users/hostImage.svg";
import css from "./Mypage.module.css";


const Mypage = () => {

  const movePage = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(
    {
      profileId: 10,
      userInfo: {
        userId: 11,
        userEmail: "jungg",
        userName: "김정목"
      },
      profileInfo: {
        // profileImg: userImage,
        profileImg: 'https://mblogthumb-phinf.pstatic.net/MjAxODEwMTlfMTgx/MDAxNTM5OTI4MjAwNDEx.k7oG-Q0tA6bdI1smaMzsK4t08NREjRrq3OthZKoIz8Qg.BeZxWi7HekwTWipOckbNWpvnesXuHjpldNGA7QppprUg.JPEG.retspe/eb13.jpg?type=w800',
        participatingGroups: null,
        interestings: 
            [
          {
            categoryId: 1,
            category: "게임"
          },
            {
            categoryId: 2,
            category: "프로젝트"
          },
        ]
      }
    }
  )
  const [ following, setFollowing ] = useState(
      [
          {
              userId: 1,
              userName: "김정목",
              profileFollowListDTO: {
                  profileId: 1,
                  profileImg: null
              }
          },
          {
              userId: 3,
              userName: "김정목",
              profileFollowListDTO: {
                  profileId: 3,
                  profileImg: null
              }
          }
      ]
  );
  const [ follower, setFollower ] = useState(
      [
          {
              userId: 1,
              userName: "김정목",
              profileFollowListDTO: {
                  profileId: 1,
                  profileImg: null
              }
          },
          {
              userId: 3,
              userName: "김정목",
              profileFollowListDTO: {
                  profileId: 3,
                  profileImg: null
              }
          },
          {
              userId: 3,
              userName: "김정목",
              profileFollowListDTO: {
                  profileId: 3,
                  profileImg: null
              }
          },
          {
              userId: 3,
              userName: "김정목",
              profileFollowListDTO: {
                  profileId: 3,
                  profileImg: null
              }
          }
      ]
  );
  useEffect(() => {
      const authToken = localStorage.getItem("key");
      if (!authToken) {
          movePage('/login');
      } else {
          const apiURL = 'https://dummyjson.com/auth/login';
          const headers = {
              'Authorization': `Bearer ${authToken}`,
          };

          fetch(apiURL, { headers })
              .then((res) => {
                  if (res.ok) {
                      return res.json();
                  } else {
                      throw new Error('user data request failed');
                  }
              })
              .then((data) => {
                  setUserData(data);
              })
              .catch((error) => {
                  console.log('Error', error);
                  //movePage('/login');
              })
      }
  }, []);

  const isMe = useEffect(() => {
      //지금 로그인 유저가 이 페이지의 userid와 같은지 확인한다.
      //지금 로그인 유저에 대한 정보가 필요함
      const now = '' //현재 로그인 유저

      if (now === userInfo.userInfo.userEmail) {
          return false;
      }
  })

  return (
    <div className="pageSize">
      <Upperbar userData={userData} />
      <div className={css.myPage}>
        <div className={css.myData}>
          <div className={css.myDataProfile}>
              <img className={css.myDataImg} src={userInfo.profileInfo.profileImg}></img>
              <div className={css.textData}>
                <p className={css.id}>@{userInfo.userInfo.userEmail}</p>
                <p className={css.name}>{userInfo.userInfo.userName}</p>
                <div className={css.follow}>
                  <p className={css.texts}>팔로잉<span>{following.length}</span></p>
                  <p className={css.texts}>팔로워<span>{follower.length}</span></p>
                </div>
              </div>
              <div>
                <button className={css.followBtn} style={{visibility: isMe ? "hidden" : "visible"}}
                onClick={() => {
                  console.log('팔로우 기능 구현 =' , )
                }}>팔로우</button>
              </div>
          </div>
          <div className={css.interest}>
            <p className={css.interestTitle}>관심사</p>
            <div className={css.interestCategory}>
              <p>게임</p>
              <p>프로젝트</p>
            </div>
          </div>
        </div>
        <div className={css.groupData}>
          kdldl
        </div>
      </div>
    </div>
  )
}

export default Mypage;