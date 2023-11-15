import Upperbar from "./Upperbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Groups from "./Groups";
import userImage from "../images/users/hostImage.svg";
import css from "./Mypage.module.css";


const Mypage = () => {

    const movePage = useNavigate();
    const [userData, setUserData] = useState(null);
    const [ follow, setFollow ] = useState({
        following : 563,
        follower : 239
    });
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

    return (
        <div className="pageSize">
            <Upperbar userData={userData} />
            <div className={css.myPage}>
                <div className={css.myData}>
                    <div className={css.myDataProfile}>
                        <img className={css.myDataImg} src={userImage}></img>
                        <div className={css.textData}>
                            <p >userId</p>
                            <p>userName</p>
                            <div className={css.follow}>
                                <p className={css.texts}>팔로잉<span>{follow.following}</span></p>
                                <p className={css.texts}>팔로워<span>{follow.follower}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className={css.interest}>
                        <p>관심사</p>
                        <div className={css.interestCategory}>
                            <p>게임</p>
                            <p>프로젝트</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Mypage;