import Upperbar from "./Upperbar";
import css from "./Mainpage.module.css";
import pagestyle from './pageSetting.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Mainmydata from "./Mainmydata";
import Groups from "./Groups";
import MakeGoorm from "./MakeGoorm";

const Mainpage = () => {

    const movePage = useNavigate();
    const [userData, setUserData] = useState({});
    const authToken = localStorage.getItem("key");

    const [followData, setFollowData] = useState([]);
    const getFollowingData = async () => {
        const apiURL = "http://13.125.111.84:8081/follow/following";
        try {
            const res = await fetch(apiURL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setFollowData(data);
            } else {
                console.log("fetch failed. res not ok");
            }
        } catch (error) {
            console.error('Error', error)
        }
    }

    useEffect(() => {
        getFollowingData();
    }, [])

    return (
        <div className="pageSize">
            <Upperbar className={css.Upperbar} userData={userData} />
            <div className={css.mainPage}>
                <div className={css.Mainmydata}>
                    <Mainmydata className={css.userData} />
                </div>
                <div className={css.groupShow}>
                    <Groups />
                </div>
            </div>
        </div>

    )
};
export default Mainpage;