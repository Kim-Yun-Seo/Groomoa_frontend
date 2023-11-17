import Upperbar from "./Upperbar";
import css from "./Mainpage.module.css";
import pagestyle from './pageSetting.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Mainmydata from "./Mainmydata";
import Groups from "./Groups";
import MakeGoorm from "./MakeGoorm";

const Mainpage = () => {
    return (
        <div className="pageSize">
            <Upperbar className={css.Upperbar}/>
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