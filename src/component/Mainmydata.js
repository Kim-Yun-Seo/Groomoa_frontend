import css from './Mainmydata.module.css'
import userImage from "../images/userImage.png";
import underLine from '../images/mydataUnderLine.svg'
import { useEffect, useState } from 'react';
import { async } from 'q';

const Mainmydata = () => {

    const authToken = localStorage.getItem("key");
    
    const [ profile, setProfile] = useState("");
    const url = "http://13.125.111.84:8081/profile/";
    useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setProfile(data);
                    console.log(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchData();
    }, []);

    const [ followings, setFollowings ] = useState([]);
    useEffect(()=>{
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
                const data = await response.json();
                setFollowings(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    },[])

    const [ followers, setFollowers ] = useState([]);
    useEffect(()=>{
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
    },[])

    const handleFollowClick = () => {
        // 모달짜기
    }

    return (
        <div className={css.dataList}>
            <div className={css.profile}>
                <img className={css.userIcon} src={userImage}></img>
                <div className={css.textData}>
                    <p className={css.id}>@{profile.userEmail}</p>
                    <p className={css.name}>{profile.userName}</p>
                </div>
            </div>
            <div className={css.follow}>
                    <p className={css.texts}
                        onClick={handleFollowClick}
                    >팔로잉<span>{followings.length}</span></p>
                    <p className={css.texts}
                        onClick={handleFollowClick}
                    >팔로워<span>{followers.length}</span></p>
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