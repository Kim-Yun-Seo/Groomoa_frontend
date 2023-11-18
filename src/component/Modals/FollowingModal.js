import css from "./Following.module.css";
import closeImg from "../../images/close.svg";
import { useState,useEffect } from "react";
import userImage from "../../images/users/user1.svg";

const FollowingModal = ({ isOpen, close, hostId }) => {
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const authToken = localStorage.getItem("key");
    const apiURL = "http://3.34.190.41/group";
    const [modalOpen, setOpen] = useState(isOpen);
    const handleClose = () => { setOpen(false); close(); }
    const handleSubmitClick = () => {
      setOpen(false);  close();
  }
    const [followingList, setFollowingList] = useState(
      [
        {
            "userId": 2,
            "userEmail": "goormoa5",
            "userName": "구르모아5",
            "followDetailListDTO": {
                "profileId": 2,
                "profileImg": userImage
            }
        },         {
          "userId": 2,
          "userEmail": "goormoa6",
          "userName": "구르모아6",
          "followDetailListDTO": {
              "profileId": 2,
              "profileImg": userImage
          }
      }
      ]
    );
    const body = {
        "groupTitle": title,
        "groupInfo": detail,
        "maxCount": maxParticipants,
        // "category": selectedCategory,
        "closeDate": "2023-11-21T17:30:00"
    }
    console.log(JSON.stringify(body));
    useEffect(() => {
      const fetchData = async () => {
          try {
              //url 일부러 조져놓음 더미데이터 만들어지면 다시 연결하기
              const response = await fetch('http://3.34.190.41/follow/followering', {
                  method: "GET",
                  headers: {
                      'Authorization': `Bearer ${authToken}`,
                  },
              });
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setFollowingList(data);
              console.log('setFollowerList= ',data);
          } catch (error) {
              console.log('kkk =' , )
              console.error('Error fetching data:', error);
          }
      }
      fetchData();
  }, []);

    return (
        <div className={css.newModalPage}>
            <div className={css.closeDiv}>
                <button className={css.closeBtn} onClick={handleClose}><img className={css.closeImg} src={closeImg} /></button>
            </div>
            <div>
              {followingList.map((following) => (
                <>
                  <div>
                    <p className={css.category} style={{marginTop: "30px", float: "left"}}><img src={following.followDetailListDTO.profileImg}></img></p>
                    <p className={css.category} style={{marginLeft: "10px"}}>@{following.userEmail}</p>
                    <p className={css.category} style={{marginLeft: "10px"}}>{following.userName}</p>
                    <button className={css.btn} style={{float: "right"}}>팔로우</button>
                  </div>
                  
                </>
              ))}
            </div>
        </div>
    )
}

export default FollowingModal;