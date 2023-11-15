import { useState } from "react"
import grayGoorm from '../images/goorm_gray.svg'
import userImage from "../images/userImage.png"
import css from "./MakeGoorm.module.css"

const MakeGoorm = () => {
    const [ isOpen, setModalOpen ] = useState(false);
    const handleClick = () => {
        setModalOpen((prev)=>!prev);
    }
    return (
            <div className={css.NewGoorm}>
                <button className={css.newGroupModalButton} onClick={handleClick}><img src={grayGoorm}/><p className={css.newGoormText}>오늘은 어떤 구름을 띄우고 싶나요?</p></button>
            </div>
    )
}

export default MakeGoorm;