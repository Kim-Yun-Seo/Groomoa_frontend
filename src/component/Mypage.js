import Upperbar from "./Upperbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useInsertionEffect, useState } from "react";
import Groups from "./Groups";
import css from "./Mypage.module.css";
import userImage from "../images/users/user1.svg";
import ModifyProfile from "./Modals/ModifyProfile";
import { useParams } from "react-router-dom";
import Goorm from "./Goorm";
import DetailModal from "./Modals/DetailModal";
import FollowerModal from "./Modals/FollowerModal";
import FollowingModal from "./Modals/FollowingModal";

const Mypage = () => {
  const inUrl = useParams();
  const [followerOn, setFollowerOn ] = useState(false)
  const [followingOn, setFollowingOn ] = useState(false)
  const [ parameter, setParameter] = useState(inUrl.userId);
  console.log(parameter);

  const [isModifyOpen, setModifyOpen] = useState(false);
  const handleModifyOpen = () => { setModifyOpen(true) };
  const handleModifyClose = () => { setModifyOpen(false) };
  const followingOff = () => {setFollowingOn(!followingOn)}
  const followerOff = () => {setFollowerOn(!followerOn)}

  const movePage = useNavigate();
  const authToken = localStorage.getItem("key");
  const [profile, setProfile] = useState({
    userId: 2,
    userEmail: "goormoa222",
    userName: "구르모아222",
    profileId: 2,
    profileImg: userImage,
    category: [
        "게임",
        "프로젝트"
    ]
});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://3.34.179.233/profile', {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setProfile(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);


  const [followings, setFollowings] = useState([
    {
        "userId": 2,
        "userEmail": "goormoa2",
        "userName": "구르모아2",
        "followDetailListDTO": {
            "profileId": 2,
            "profileImg": "수정용이미지2"
        }
    }
]);
const [followers, setFollowers] = useState([
  {
    "userId": 2,
    "userEmail": "goormoa2",
    "userName": "구르모아2",
    "followDetailListDTO": {
        "profileId": 2,
        "profileImg": "수정용이미지2"
    }
}
]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://3.34.179.233/follow/followers', {
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

  const [userId, setUserId] = useState("")
  useEffect(() => {
    if (parameter == "my") {
      setUserId("");
    } else {
      setUserId(parameter);
    }
  }, [])

  const [isMe, setIsMe] = useState(true);
  useEffect(() => {
    if (userId === profile.userId) {
      setIsMe(true);
    }
  }, [])

  const [apiURL, setApiUrl] = useState('http://3.34.179.233/group/myGroups');
  if (!isMe) {
    setApiUrl(`http://3.34.179.233/group/myGroups/${parameter}`);
    console.log(apiURL);
  }
  const [groupList, setGroupList] = useState(
    {
      recruitingGroups: [],
      participatingGroups: [],
    }
  );
  useEffect(() => {
    const fetchData = async () => {
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

  // 필터링 옵션으로 하고 싶었는데 진짜 머리가 더이상 안돌아가서 노가다로 할게....
  const followUser = async () => {
    if (isMe) {
      console.log("its me")
      try {
        const response = await fetch('http://3.34.179.233/follow/following', {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFollowings(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      console.log("its not me");
      try {
        const response = await fetch(`http://3.34.179.233/follow/following/${parameter}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFollowings(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  const handleFollowClick = () => {
    followUser();
  }
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [modalById, setModalById] = useState(0);
  const handleDetailModalClose = () => { setDetailModalOpen(false); }
  const handleDetailModalOpen = (groupId) => {
    setModalById(groupId);
    console.log(modalById);
    setDetailModalOpen(true);
  }

  // following 상태면 follow button 사라지게 해야됨....
  return (
    <div className="pageSize">
      <Upperbar />
      <div className={css.myPage}>
        <div className={css.myData}>
          <div className={css.myDataProfile}>
            <img className={css.myDataImg} src={profile.profileImg}></img>
            <div className={css.textData}>
              <p className={css.id}>@{profile.userEmail}</p>
              <p className={css.name}>{profile.userName}</p>
              <div className={css.follow}>
                <p className={css.texts}
                  onClick={
                    () => {
                      setFollowerOn(!followerOn);
                      handleFollowClick()
                    }
                  }>팔로워<span>{followings.length}</span></p>
                <p className={css.texts}
                  onClick={
                    () => {
                      setFollowingOn(!followingOn);
                      handleFollowClick()
                    }
                  }>팔로잉<span>{followings.length}</span></p>
              </div>
            </div>
            <div style={{ visibility: followerOn ? "visible" : "hidden"}}>
              <FollowerModal
                  className={css.newGroupMake}
                  close={followerOff}
              />
            </div>
            <div style={{ visibility: followingOn ? "visible" : "hidden"}}>
              <FollowingModal
                  className={css.newGroupMake}
                  close={followingOff}
              />
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
              {profile.category.map((interest) => (
                <p className={css.category} key={interest}>{interest}</p>
              ))}
            </div>
          </div>
        </div>
        {isDetailModalOpen &&
          <DetailModal
            isOpen={isDetailModalOpen}
            close={handleDetailModalClose}
            groupId={modalById}

          />
        }
        <div className={css.groupData}>
          <div>
            {
              <ul className={css.partyContainer}>
                {groupList.recruitingGroups.map((group) => (
                  <a className={css.groups} key={group.groupId} onClick={() => handleDetailModalOpen(group.groupId)}>
                    <Goorm className={css.goorm} value={group} />
                  </a>
                ))}
              </ul>}
            <button className={css.groupBtn} onClick={() => console.log('구름 필터링 =',)}>방장 : 진행</button>
            <button className={css.groupBtn} onClick={() => console.log('구름 필터링 =',)}>방장 : 마감</button>
            <button className={css.groupBtn} onClick={() => console.log('구름 필터링 =',)}>참가 : 진행</button>
            <button className={css.groupBtn} onClick={() => console.log('구름 필터링 =',)}>참가 : 마감</button>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mypage;