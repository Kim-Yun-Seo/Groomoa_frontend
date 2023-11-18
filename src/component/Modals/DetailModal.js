import { useEffect, useState } from 'react';
import css from './DetailModal.module.css';
import closeImg from "../../images/close.svg";
import peoplePurple from "../../images/peoplePurple.svg";
import peopleWhite from "../../images/peopleWhite.svg";
import { useNavigate } from 'react-router-dom';
import RandomImage from "../RandomPerson";

const DetailModal = ({ isOpen, close, groupId }) => {
    const thisGroupId = groupId;
    const movePage = useNavigate();
    localStorage.setItem("userEmail", "박민석");
    const myUserEmail = localStorage.getItem("userEmail");
    const handleChatGo = () => {
        movePage(`/chat-room/${thisGroupId}/${myUserEmail}`);
    }
    console.log(thisGroupId);
    const [isHost, setHost] = useState(true);
    const [modalOpen, setModalOpen] = useState(isOpen);
    const handleCloseModal = () => { setModalOpen(false); close(); }
    const [groupInfo, setGroupInfo] = useState({
        "groupId": 1,
        "userId": 11,
        "userEmail": "11",
        "userName": "김정목",
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
    const authToken = localStorage.getItem("key");
    useEffect(() => {
        const fetchData = async () => {
            console.log(thisGroupId);
            try {
                const response = await fetch(`http://3.34.190.41:8081/group/${groupId}`, {
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
    }, [groupInfo]);
    const isAllowed = groupInfo.participants.some(participant => participant.userEmail === myUserEmail);
    const isApplicated = groupInfo.participants.some(applicants => applicants.userEmail === myUserEmail)
    const [isRecruiting, setRecruitiing] = useState(!groupInfo.close);
    const handleRecruitClick = () => { setRecruitiing(prev => !prev); };

    const fetchDecline = async (userId) => {
        console.log(userId);
        console.log(groupId);
        try {
            const response = await fetch(`http://3.34.190.41:8081/group/${groupId}/reject/${userId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setGroupInfo(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDecline = (userId) => {
        fetchDecline(userId);
    }

    const fetchApproval = async (userId) => {
        console.log(userId);
        console.log(groupId);
        try {
            const response = await fetch(`http://3.34.190.41:8081/group/${groupId}/approve/${userId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setGroupInfo(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleApproval = (userId) => {
        fetchApproval(userId);
    }

    return (
        <div className={css.detailModalPage}>
            <div className={css.closeDiv}>
                <button className={css.closeBtn} onClick={handleCloseModal}><img className="closeImg" src={closeImg} /></button>
            </div>
            <div className={css.mainData}>
                {isHost ? (<ul className={css.partUList}>
                    {groupInfo.applicants.map((partList) => (
                        <div className={css.singlePart} key={partList.userId}>
                            {/* <img className={css.singlePartImg} src={partList.profileImg} /> */}
                            <RandomImage className={css.singlePartImg}/>
                            <div className={css.singlePartInfo}>
                                <p className={css.singlePartId}>@{partList.userEmail}</p>
                                <p className={css.singlePartName}>{partList.userName}</p>
                                <div>
                                    <button onClick={() => { handleApproval(partList.userId) }}>수락</button>
                                    <button onClick={() => { handleDecline(partList.userId) }}>거절</button>
                                </div>
                            </div>

                        </div>
                    ))}
                </ul>) : null}
                <p className={css.detailCategory}>{groupInfo.category}</p>
                <p className={css.detailDL}>~ {groupInfo.closeDate}</p>
                <p className={css.detailTitle}>{groupInfo.groupTitle}</p>
                <p className={css.detailDetail}>{groupInfo.groupInfo}</p>
                <p className={css.partList}>참여 인원 목록</p>
                <ul className={css.partUList}>
                    {groupInfo.participants.map((partList) => (
                        <div className={css.singlePart} key={partList.userId}>
                            <RandomImage className={css.singlePartImg}/>
                            <div className={css.singlePartInfo}>
                                <p className={css.singlePartId}>@{partList.userEmail}</p>
                                <p className={css.singlePartName}>{partList.userName}</p>
                            </div>
                        </div>
                    ))}
                </ul>
                {isHost ? (
                    isRecruiting ? (<div><button className={css.btn} onClick={handleRecruitClick}>모집하기</button></div>
                    ) : (<div><button className={css.btn} onClick={handleRecruitClick}>마감하기</button></div>)
                ) : (
                    isAllowed ? (<div><button className={css.btn}>참가 중</button></div>) : (
                        isApplicated ? (<div><button className={css.btn}>요청됨</button></div>) : (<div><button className={css.btn} >참가하기</button></div>)
                    )
                )}
                {isHost ? (
                    <div><button className={css.btn} onClick={handleChatGo}>채팅방 참여하기</button></div>
                ) : (
                    isAllowed ? (<div><button className={css.btn} onClick={handleChatGo}>채팅방 참여하기</button></div>) : null)}
            </div>
        </div>
    )
}
export default DetailModal;