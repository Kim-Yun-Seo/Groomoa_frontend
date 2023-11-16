import css from "./NotiModal.module.css";
import { useState } from "react";

const NotiModal = ({isOpen, alarmList}) => {
    return (
        <div>
            {isOpen && 
                <div className="noti">
                    <p>알람모달</p>
                </div>
            }
        </div>
    )
}
export default NotiModal;