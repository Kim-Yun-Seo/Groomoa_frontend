import { useEffect, useState } from 'react';
import css from './DetailModal.module.css';
import closeImg from "../../images/close.svg";

const DetailModal = ({ isOpen, close, groupId }) => {
    const [modalOpen, setModalOpen] = useState(isOpen);

    const handleCloseModal = () => {
        setModalOpen(false);
        close();
    }

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
        "close": null
    });
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("key");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://13.125.111.84:8081/group/${groupId}`, {
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
                <p>hostId랑 userId 비교해서 맞으면 applicants 볼 수 있도록. 누르면 click event</p>

            </div>
        </div>
    )
}
export default DetailModal;