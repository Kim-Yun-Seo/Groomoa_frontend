import { useEffect, useState } from 'react';
import css from './DetailModal.module.css';
import closeImg from "../../images/close.svg";
import user1 from "../../images/users/user1.svg";
import user2 from "../../images/users/user2.svg";
import user3 from "../../images/users/user3.svg";
import user4 from "../../images/users/user4.svg";
import user5 from "../../images/users/user5.svg";
import hostImage from "../../images/users/hostImage.svg";

const DetailModal = ({ isOpen, close, groupId }) => {
    const [modalOpen, setModalOpen] = useState(isOpen);

    const handleCloseModal = () => {
        setModalOpen(false);
        close();
    }

    const groupInfo = {
        "deadLine": "2023년 11월 20일",
        "title": "롤 대회 멤버 구합니다!",
        "detail": "구름대 롤 대회 인원 구합니다! 저는 정글러이고, 최소 플레 이상으로 구하고 있습니다! 많은 관심 부탁드립니다~",
        "category": "🎮 게임",
        "part_list": [
            { "userIndex": 1, "userId": "goorm_Koo", "userName": "구구름", "userIcon": user1 },
            { "userIndex": 2, "userId": "goorm_Lee", "userName": "이구름", "userIcon": user2 },
            { "userIndex": 3, "userId": "goorm_Park", "userName": "박구름", "userIcon": user3 },
            { "userIndex": 4, "userId": "goorm_Kim", "userName": "김구름", "userIcon": user4 },
            { "userIndex": 5, "userId": "goorm_Kang", "userName": "강구름", "userIcon": user5 }
        ]
    }

    return (
        <div className={css.detailModalPage}>
            <div className={css.closeDiv}>
                <button className={css.closeBtn} onClick={handleCloseModal}><img className="closeImg" src={closeImg} /></button>
            </div>
            <div className={css.mainData}>
                <p className={css.detailCategory}>{groupInfo.category}</p>
                <p className={css.detailDL}>~ {groupInfo.deadLine}</p>
                <p className={css.detailTitle}>{groupInfo.title}</p>
                <p className={css.detailDetail}>{groupInfo.detail}</p>
                <p className={css.partList}>참여 인원 목록</p>
                <ul className={css.partUList}>
                    {groupInfo.part_list.map((partList) => (
                        <div className={css.singlePart} key={partList.userIndex}>
                            <img className={css.singlePartImg}src={partList.userIcon} />
                            <div className={css.singlePartInfo}>
                                <p className={css.singlePartId}>@{partList.userId}</p>
                                <p className={css.singlePartName}>{partList.userName}</p>
                            </div>
                        </div>
                    ))}
                </ul>


            </div>
        </div>
    )
}
export default DetailModal;