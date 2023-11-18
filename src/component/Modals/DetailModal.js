import { useEffect, useState } from 'react';
import css from './DetailModal.module.css';
import closeImg from "../../images/close.svg";
import peoplePurple from "../../images/peoplePurple.svg";
import peopleWhite from "../../images/peopleWhite.svg";

const DetailModal = ({isOpen, close, groupId}) => {
    localStorage.getItem("userId");
    console.log(groupId);
    const [modalOpen, setModalOpen] = useState(isOpen);
    const handleCloseModal = () => { setModalOpen(false); close(); }
    const [ groupInfo, setGroupInfo ] = useState({
        "groupId": 1,
        "host": {
            "userId": 11,
            "userEmail": "11",
            "userName": "김정목"
        },
        "closeDate": null,
        "groupTitle": "모임1",
        "groupInfo": "모임 설명",
        "participants": [
            {
                "userId": 10,
                "userEmail": "10",
                "userName": "김정목",
                "profileId": 9,
                "profileImg": null
            },
            {
                "userId": 10,
                "userEmail": "10",
                "userName": "김정목",
                "profileId": 9,
                "profileImg": null
            },
            {
                "userId": 11,
                "userEmail": "11",
                "userName": "김정목",
                "profileId": 10,
                "profileImg": null
            },
            {
                "userId": 10,
                "userEmail": "10",
                "userName": "김정목",
                "profileId": 9,
                "profileImg": null
            },
            {
                "userId": 10,
                "userEmail": "10",
                "userName": "김정목",
                "profileId": 9,
                "profileImg": null
            },
            {
                "userId": 11,
                "userEmail": "11",
                "userName": "김정목",
                "profileId": 10,
                "profileImg": null
            }
        ],
        "applicants": [
            {
                "userId": 10,
                "userEmail": "10",
                "userName": "김정목",
                "profileId": 9,
                "profileImg": null
            },
            {
                "userId": 10,
                "userEmail": "10",
                "userName": "김정목",
                "profileId": 9,
                "profileImg": null
            },
            {
                "userId": 11,
                "userEmail": "11",
                "userName": "김정목",
                "profileId": 10,
                "profileImg": null
            }
        ],
        "maxCount": 12,
        "currentCount": 1,
        "close": false
    });
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("key");
    useEffect(() => {
        const fetchData = async () => {
            console.log(groupId);
            try {
                const response = await fetch(`http://43.200.164.196:8081/group/${groupId}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGroupInfo(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    const [ isHost, setHost ] = useState(false);
    const isAllowed = groupInfo.participants.some(participant => participant.userId === parseInt(userId, 10));
    const isApplicated = groupInfo.participants.some(applicants => applicants.userId === parseInt(userId, 10))
    const isRecruiting = !groupInfo.close;
  

    return (
        <div className={css.detailModalPage}>
            <div className={css.closeDiv}>
                <button className={css.closeBtn} onClick={handleCloseModal}><img className="closeImg" src={closeImg} /></button>
            </div>
            <div className={css.mainData}>
                <p className={css.detailCategory}>{groupInfo.category}</p>
                <p className={css.detailDL}>~ {groupInfo.closeDate}</p>
                <p className={css.detailTitle}>{groupInfo.groupTitle}</p>
                <p className={css.detailDetail}>{groupInfo.groupInfo}</p>
                <p className={css.partList}>참여 인원 목록</p>
                <ul className={css.partUList}>
                    {groupInfo.participants.map((partList) => (
                        <div className={css.singlePart} key={partList.userId}>
                            <img className={css.singlePartImg}src={partList.profileImg} />
                            <div className={css.singlePartInfo}>
                                <p className={css.singlePartId}>@{partList.userEmail}</p>
                                <p className={css.singlePartName}>{partList.userName}</p>
                            </div>
                        </div>
                    ))}
                </ul>
                {isHost ? (
                    isRecruiting ? (<div>모집하기</div>) : (<div>마감하기</div>)
                ) : (
                    isAllowed ? (<div><p>참가 중</p></div>) : (
                        isApplicated ? (<div><p>요청됨</p></div>) : (<div>참가하기</div>)
                    )
                )}
            </div>
        </div>
    )
}
export default DetailModal;