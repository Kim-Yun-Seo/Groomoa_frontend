import Upperbar from "./Upperbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useInsertionEffect, useState } from "react";
import Groups from "./Groups";
import css from "./Mypage.module.css";
import userImage from "../images/users/user1.svg";
import ModifyProfile from "./Modals/ModifyProfile";

const Mypage = () => {
  //temp
  const userIcon = userImage;

  const [isModifyOpen, setModifyOpen] = useState(false);
  const handleModifyOpen = () => { setModifyOpen(true) };
  const handleModifyClose = () => { setModifyOpen(false) };

  const movePage = useNavigate();
  const authToken = localStorage.getItem("key");
  const [userInfo, setUserInfo] = useState({
    "profileId": null,
    "userInfo": {
      "userId": 11,
      "userEmail": "11",
      "userName": "홍성주"
    },
    "profileInfo": {
      "profileImg": "수정된이미지",
      "interestings": [
        {"categoryId": 1, "category": "게임"},
        {"categoryId": 2, "category": "프로젝트"}
      ]
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
  }, isModifyOpen);

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

  const [userId, setUserId] = useState("default")
  useEffect(() => { setUserId(localStorage.getItem("userId")) })

  const [isMe, setIsMe] = useState(false);
  useEffect(() => {
    if (userId === userInfo.userInfo.userId) {
      setIsMe(true);
    }
  }, [])

  const [apiURL, setApiUrl] = useState('http://13.125.111.84:8081/group/myGroups');
  const [groupList, setGroupList] = useState(
    [
      {
        "recruitingGroups": [
          {
            "groupId": 1,
            "host": {
              "userId": 11,
              "userEmail": "11",
              "userName": "김정목"
            },
            "category": null,
            "closeDate": null,
            "groupTitle": "모임1",
            "groupInfo": "모임 설명",
            "maxCount": null,
            "currentCount": 1,
            "close": null
          },
          {
            "groupId": 2,
            "host": {
              "userId": 11,
              "userEmail": "11",
              "userName": "김정목"
            },
            "category": null,
            "closeDate": null,
            "groupTitle": "모임2",
            "groupInfo": "모임 설명",
            "maxCount": null,
            "currentCount": 1,
            "close": null
          },
        ],
        "participatingGroups": [
          {
            "groupId": 3,
            "host": {
              "userId": 11,
              "userEmail": "11",
              "userName": "김정목"
            },
            "category": null,
            "closeDate": null,
            "groupTitle": "모임2",
            "groupInfo": "모임 설명",
            "maxCount": null,
            "currentCount": 1,
            "close": null
          },
        ]
      }
    ]
  );
  useEffect(() => {
    if (isMe == false) {
      setApiUrl(`http://13.125.111.84:8081/group/myGroups/${userId}`)
    }
    const fetchData = async () => {
      console.log(apiURL);
      try {
        const response = await fetch(apiURL, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGroupList(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    }
    fetchData();
  }, []);
  
  const recruits = !groupList? groupList.filter(groups => groups.recruitingGroups) : [];
  const closedRecruits = !recruits?recruits.filter(group => group.close === true):null;
  const openRecruits = !recruits?recruits.filter(group => group.close === false):null;

  const participating = !groupList? groupList.filter(group => group.participatingGroups):[]; 
  const closedParts = !participating ? participating.filter(group => group.close === true) : null;
  const openParts = !participating? participating.filter(group => group.close === false):null;

  

  // 필터링 옵션으로 하고 싶었는데 진짜 머리가 더이상 안돌아가서 노가다로 할게....
  const followUser = async () => {
    try {
      const response = await fetch('http://13.125.111.84:8081/follow/following', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGroupList(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleFollowClick = () => {
    followUser();
  }

  // following 상태면 follow button 사라지게 해야됨....
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
              {isMe ? null : <button className={css.followBtn}
                onClick={handleFollowClick}>팔로우</button>}
            </div>
            {isModifyOpen &&
              <ModifyProfile
                isOpen={isModifyOpen}
                close={handleModifyClose}
              />}
            <div>
              {!isMe ? null : <button className={css.followBtn}
                onClick={handleModifyOpen}>프로필 편집</button>}
            </div>
          </div>
          <div className={css.interest}>
            <p className={css.interestTitle}>관심사</p>
            <div className={css.interestCategory}>
              {!userInfo.profileInfo.interestings ? <p>no interest</p> : userInfo.profileInfo.interestings.map((interests) => (
                <p className={css.category} key={interests.categoryId}>{interests.category}</p>
              ))}
            </div>
          </div>
        </div>
        <div className={css.groupData}>
          <div>
            <button className={css.groupBtn} onClick={() => console.log('구름 필터링 =',)}>모집한 구름</button>
            <button className={css.groupBtn} onClick={() => console.log('구름 필터링 =',)}>참가한 구름</button>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mypage;