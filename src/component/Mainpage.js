import Upperbar from "./Upperbar";
import css from "./Mainpage.module.css";
import pagestyle from './pageSetting.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Mainmydata from "./Mainmydata";
import Groups from "./Groups";
import MakeGoorm from "./MakeGoorm";

const Mainpage = () => {
  const [userEmail, setUserEmail] = useState("default");
  const movePage = useNavigate();
  //이거 지워야함
  localStorage.setItem("userEmail", userEmail);
  const authToken = localStorage.getItem("key");

  useEffect(() => {
    if(!localStorage.getItem("key"))
    {movePage('/')}
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
        setUserEmail(data.userInfo.userEmail);
        localStorage.setItem("userEmail", userEmail);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="pageSize">
      <Upperbar className={css.Upperbar} />
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