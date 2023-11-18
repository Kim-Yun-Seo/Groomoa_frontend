import css from "./FollowerModal.module.css";
import closeImg from "../../images/close.svg";
import { useState,useEffect } from "react";

const FollowerModal = ({ isOpen, close, hostId }) => {


    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const authToken = localStorage.getItem("key");
    const apiURL = "http://13.209.26.40:8081/group";
    const [followerList, setFollowerList] = useState(
      [
        {
          userId: 1,
          userEmail: "",
          userName: "",
          profileFollowListDTO: {
              profileId: 1,
              profileImg: null
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
              const response = await fetch('http://13.209.26.40:8081//follow/followers/ ', {
                  method: "GET",
                  headers: {
                      'Authorization': `Bearer ${authToken}`,
                  },
              });
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setFollowerList(data);
              console.log(data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      }
      fetchData();
  }, []);

    return (
        <div className={css.newModalPage}>
            <div className={css.closeDiv}>
                <button className={css.closeBtn}><img className={css.closeImg} src={closeImg} /></button>
            </div>
            <div>
              {followerList.map((follower) => (
                <p className={css.category}>{follower.userEmail}</p>
              ))}
            </div>
        </div>
    )
}

export default FollowerModal;