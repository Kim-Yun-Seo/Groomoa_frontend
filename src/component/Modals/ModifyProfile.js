import css from "./ModifyProfile.module.css";
import closeImg from "../../images/close.svg";
import { useState } from "react";

const ModifyProfile = ({ isOpen, close }) => {

    const [modalOpen, setOpen] = useState(isOpen);
    const handleClose = () => { setOpen(false); close(); }

    const category = ["🎮 게임", "📚 스터디", "🖥️ 프로젝트", '🎬 문화/공연', '⚾️ 운동/스포츠', '🫶 사교/인맥', '🛩️ 여행', '기타'];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleCategoryClick = (category) => { setSelectedCategory(category === selectedCategory ? null : category); };

    const [userProfile, setUserProfile] = useState({
        "profileId": null,
        "userInfo": {
            "userId": 11,
            "userEmail": "11",
            "userName": "홍성주"
        },
        "profileInfo": {
            "profileImg": "수정된이미지",
            "interestings": null
        }
    });
    const authToken = localStorage.getItem("key");
    const apiURL = "https://goormoagit-afdgu.run.goorm.site//profile";
    const body = {
        "profileId": 3,
        "userInfo": {
            "userId": 3,
            "userEmail": "rabbit",
            "userName": "rabbit"
        },
        "profileInfo": {
            "profileImg": null,
            "category": null
        }
    }
    const postProfile = async () => {
        try {
            const res = await fetch(apiURL, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: body,
            });
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    const handleSubmitClick = () => {
        postProfile();
        setOpen(false); close();
    }

    return (
        <div className={css.newModalPage}>
            <div className={css.closeDiv}>
                <button className={css.closeBtn} onClick={handleClose}><img className={css.closeImg} src={closeImg} /></button>
            </div>
            <div className={css.mainData}>
                <input className={css.title} maxLength={15}
                    value={userProfile.userInfo.userName}
                    onChange={(e) => setUserProfile({
                        "userInfo" : {
                            "userName" : e.target.value
                        }})}
                    placeholder="새로운 이름을 입력해주세요"></input>
                <div className={css.setting}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p className={css.p_setting}>카테고리</p><p style={{ marginTop: "-20px" }}>(택1)</p>
                    </div>
                    <div className={css.categorySelect}>{
                        category.map((option) => (
                            <button key={option}
                                className={selectedCategory === option ? `${css.selected}` : `${css.notselected}`}
                                onClick={() => handleCategoryClick(option)} >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={css.completeDiv}>
                <button className={css.completeBtn} onClick={handleSubmitClick}>프로필 저장</button>
            </div>
        </div>
    )
}

export default ModifyProfile;