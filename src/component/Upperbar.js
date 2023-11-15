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

    //const userImage = localStorage.getItem("userIcon");
    const [isNotiOpen, setNotiOpen] = useState(false);
    const [isNewNoti, setNewNoti] = useState(false);
    const [isMsgOpen, setMsgOpen] = useState(false);
    const [isNewMsg, setNewMsg] = useState(true);
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [loggedin, setLoggedIn] = useState(true);
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        //const apiURL = 'http://13.125.111.84:8081/login';
        const apiURL = 'https://dummyjson.com/users/Auth'
        const authToken = localStorage.getItem("key");
        setToken(authToken);
        if (!authToken) {
            movePage('/login');
        } else {/* providing token in bearer */
            fetch(apiURL, { 
                method: 'POST', /* or POST/PUT/PATCH/DELETE */
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res=>console.log(res));
        }
    },[])

    const movePage = useNavigate();
    const homeClick = () => { movePage('/main') }
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [isSearchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        if (isSearchOpen) {
            console.log("searched!");
            fetch(`https://dummyjson.com/users/search?q=${search}`)
                .then(res => res.json())
                .then(res => {
                    (setSearchResult(JSON.stringify(res.users)));
                    console.log(searchResult);
                })
        }
    }, [isSearchOpen, search]);

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
                        searchUserOpen(true);
                    }}
                    className={search != "" ? `${css.searchUserOn}` : `${css.searchUser}`}
                    placeholder="이름/아이디 검색하기"
                />
                {search && <div className={css.searchResult}>
                    <SearchUser
                        isOpen={isSearchOpen}
                        searchResult={searchResult}
                    />
                </div>}
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
                    <img src={userImage} className={css.userpage} onClick={userInfoModalOpen} />
                    {<UserMenuModal isOpen={isUserMenuOpen} />}
                </div>

            </div>

        </div>
    )
}
export default Upperbar;