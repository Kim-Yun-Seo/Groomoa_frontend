import css from './Mainmydata.module.css'
import userImage from "../images/userImage.png";
import underLine from '../images/mydataUnderLine.svg'
import { useEffect, useState } from 'react';
import RandomImage from "../component/RandomPerson";

const Mainmydata = () => {

    const authToken = localStorage.getItem("key");

    const [profile, setProfile] = useState({
        "profileId": 10,
        "userInfo": {
            "userId": 11,
            "userEmail": "goormoa",
            "userName": "구름이"
        },
        "profileInfo": {
            "profileImg": null,
            "participatingGroups": null,
            "interestings": null
        }
    });
    const url = "https://goormoagit-afdgu.run.goorm.site/profile/";
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

    const [followings, setFollowings] = useState([
        {
            "userId": 1,
            "userName": "김정목",
            "profileFollowListDTO": {
                "profileId": 1,
                "profileImg": null
            }
        },
        {
            "userId": 3,
            "userName": "김정목",
            "profileFollowListDTO": {
                "profileId": 3,
                "profileImg": null
            }
        }
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://goormoagit-afdgu.run.goorm.site/follow/following', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type' : 'application/json',
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
    }, [])

    const [followers, setFollowers] = useState([
        {
            "userId": 1,
            "userName": "김정목",
            "profileFollowListDTO": {
                "profileId": 1,
                "profileImg": null
            }
        },
        {
            "userId": 3,
            "userName": "김정목",
            "profileFollowListDTO": {
                "profileId": 3,
                "profileImg": null
            }
        }
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://goormoagit-afdgu.run.goorm.site/follow/followers', {
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

    const [recommend, setRecommend] = useState([
        {
            "userId": 3,
            "userEmail": "slsdfkls",
            "userName": "구름이",
            "profileImg": null
        },
        {
            "userId": 3,
            "userEmail": "vnlxklsl",
            "userName": "정목이",
            "profileImg": null
        },
        {
            "userId": 3,
            "userEmail": "eieie",
            "userName": "성주",
            "profileImg": null
        },
        {
            "userId": 3,
            "userEmail": "emaipwl3",
            "userName": "민석이",
            "profileImg": null
        }
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://goormoagit-afdgu.run.goorm.site/recommend', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecommend(data);
                console.log(recommend);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleFollowClick = () => {
        // 모달짜기
    }
    console.log('',profile.userEmail)

    return (
        <div className={css.dataList}>
            <div className={css.profile}>
                <div className={css.textData}>
                    <RandomImage />
                    <p className={css.id}>@{profile.userInfo.userEmail}</p>
                    <p className={css.name}>{profile.userInfo.userName}</p>
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
                <ul className={css.recommendFriend}>{
                    recommend.map((user) => (
                        <div key={user.userId}>
                            {/* <img src={user.profileImg}></img> */}
                            <RandomImage />
                            <div>
                                <p>@{user.userEmail}</p>
                                <p style={{marginBottom: "30px", marginTop: "-10px"}}>{user.userName}</p>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Mainmydata;