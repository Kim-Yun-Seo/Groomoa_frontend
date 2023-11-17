import { useNavigate } from "react-router-dom"
import css from "./Upperbar.module.css"
import { useEffect, useState } from "react";
import SearchUser from './Modals/SearchUser';
import goorm from '../images/goorm_login.svg';
import alarmImage from "../images/alarm.svg";
import goormMsg from "../images/Group.svg";
import socialImage from "../images/social.svg";
import searchIcon from '../images/searchIcon.svg';
import userImage from "../images/userImage.png";
import MsgModal from "./Modals/MsgModal";
import NotiModal from "./Modals/NotiModal";
import UserMenuModal from "./Modals/UserMenuModal";

const Upperbar = () => {

    const userId = localStorage.getItem("userId");
    const groupId = "abc";
    const handleChatGo = () => {
        movePage(`/chat-room/${groupId}/${userId}`);
    }

    //const userImage = localStorage.getItem("userIcon");
    const [isNotiOpen, setNotiOpen] = useState(false);
    const [isNewNoti, setNewNoti] = useState(false);
    const [isMsgOpen, setMsgOpen] = useState(false);
    const [isNewMsg, setNewMsg] = useState(true);
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [loggedin, setLoggedIn] = useState(true);
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);


    const movePage = useNavigate();
    const homeClick = () => { movePage('/main') }
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([
        {
            "userId": 1,
            "userEmail": "1",
            "userName": "김정목",
            "profileId": 1,
            "profileImg": null
        },
        {
            "userId": 2,
            "userEmail": "2",
            "userName": "김정목2",
            "profileId": 2,
            "profileImg": null
        },
        {
            "userId": 3,
            "userEmail": "3",
            "userName": "김정목3",
            "profileId": 3,
            "profileImg": null
        },
        {
            "userId": 4,
            "userEmail": "4",
            "userName": "김정목4",
            "profileId": 4,
            "profileImg": null
        }
    ]);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const authToken = localStorage.getItem("key");
    const [allUserList, setAllUserList] = useState([]);
    const searchClicked = async () => {
        try {
            const response = await fetch(`http://13.209.26.40:8081/users`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAllUserList(data);

            const filteredUsers = data.filter((user) => {
                const regex = new RegExp(search, 'ig');
                return regex.test(user.userName);
            });

            setSearchResult(filteredUsers);
            setSearchOpen(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleShowButtonClick = (userId) => {
        movePage(`/mypage/${userId}`);
        setSearchOpen(false);
    };

    const searchUserOpen = () => { setSearchOpen(true); setNotiOpen(false); setMsgOpen(false); setUserMenuOpen(false); }
    const alarmModalOpen = () => { setNotiOpen(true); setSearchOpen(false); setMsgOpen(false); setUserMenuOpen(false); }
    const msgModalOpen = () => { setMsgOpen(true); setSearchOpen(false); setNotiOpen(false); setUserMenuOpen(false); }
    const userInfoModalOpen = () => { setUserMenuOpen(true); setSearchOpen(false); setNotiOpen(false); setMsgOpen(false); }

    return (
        <div className={css.Upperbar}>
            <div className={css.utilities}>
                <div className={css.logoDiv} onClick={homeClick}>
                    <button className={css.logoText}>GOORMOA</button>
                </div>

                <input
                    onChange={(e) => {
                        e.preventDefault();
                        setSearch(e.target.value);
                    }}
                    className={search != "" ? `${css.searchUserOn}` : `${css.searchUser}`}
                    placeholder="이름/아이디 검색하기"
                />
                <button onClick={searchClicked}><img src={searchIcon} /></button>
                {isSearchOpen && <div className={css.searchResult}>
                    <SearchUser
                        isOpen={isSearchOpen}
                        searchResult={searchResult}
                        handleShowButtonClick={handleShowButtonClick}
                    />
                </div>}
                <button style={{ border: "none", fontSize: "20px" }} onClick={handleChatGo}>GotoChat</button>
            </div>
            <div className={css.notifications}>
                <div>
                    <img src={goormMsg} className={css.message} onClick={msgModalOpen} />
                    {<MsgModal isOpen={isMsgOpen} />}
                </div>
                <div>
                    <img src={alarmImage} className={css.alarm} onClick={alarmModalOpen} />
                    {<NotiModal isOpen={isNotiOpen} />}
                </div>
                <div>
                    <img src={userImage} className={css.userpage} onClick={() => movePage('/mypage/my')} />
                    {<UserMenuModal isOpen={isUserMenuOpen} userId={userId} />}
                </div>
            </div>

        </div>
    )
}
export default Upperbar;