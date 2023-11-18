import Goorm from './Goorm';
import css from './Groups.module.css';
import groupDummy from '../groupDummy.json';
import { useEffect, useState } from 'react';
import DetailModal from "../component/Modals/DetailModal";
import underbar from '../images/groupSelectUnder.svg';
import goorm from '../images/goorm_login.svg';
import search from '../images/search_purple.svg';
import NewGroupMake from './Modals/NewGroupMake';

export default function Groups() {

    const [groupList, setGroupList] = useState([
        {
            "groupId": 1,
            "host": {
                "userId": 11,
                "userEmail": "11",
                "userName": "김정목"
            },
            "category": "게임",
            "closeDate": null,
            "groupTitle": "모임1",
            "groupInfo": "모임 설명",
            "maxCount": null,
            "currentCount": 1,
            "close": false
        },
        {
            "groupId": 2,
            "host": {
                "userId": 11,
                "userEmail": "11",
                "userName": "김정목"
            },
            "category": "프로젝트",
            "closeDate": null,
            "groupTitle": "모임2",
            "groupInfo": "모임 설명",
            "maxCount": null,
            "currentCount": 1,
            "close": false
        },
        {
            "groupId": 3,
            "host": {
                "userId": 11,
                "userEmail": "11",
                "userName": "김정목"
            },
            "category": "운동/스포츠",
            "closeDate": null,
            "groupTitle": "모임3",
            "groupInfo": "모임 설명",
            "maxCount": null,
            "currentCount": 1,
            "close": false
        }
    ]);
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("key");
    useEffect(() => {
        const fetchData = async () => {
            try {
                //url 일부러 조져놓음 더미데이터 만들어지면 다시 연결하기
                const response = await fetch('http://3.34.190.41/group', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGroupList(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [modalById, setModalById] = useState("10");
    const handleDetailModalClose = () => { setDetailModalOpen(false); }
    const handleDetailModalOpen = (groupId) => {
        setModalById(groupId);
        setDetailModalOpen(true);
    }

    const filter = ['전체', '게임', '스터디', '프로젝트', '문화/공연', '운동/스포츠', '사교/인맥', '여행', '기타'];
    const [selected, setSelected] = useState('전체');
    const handleOptionClick = (value) => { setSelected(value); };
    const filteredGroups = selected === '전체' ? groupList : groupList.filter(group => group.category === selected);

    const [isNewModalOpen, setNewModalOpen] = useState(false);
    // 모달 open 시 userId => hostId 가능하도록 props 내리기
    const handleNewModalOpen = () => { setNewModalOpen(true) };
    const handleNewModalClose = () => { setNewModalOpen(false) };

    const [searchTerm, setSearchTerm] = useState('');
    const termFilteredGroups = groupList.filter((group) =>
        new Intl.Collator('ko-KR', { sensitivity: 'base' }).compare(
            group.groupTitle,
            searchTerm
        ) == 0
        // 완벽히 맞을 필요 없는데... 이거 융통성 있게 바꾸면 진짜 나이스
    );

    return (
        <div className="pageBody">
            {(isNewModalOpen || isDetailModalOpen) && (<div className={css.darkOverlay} onClick={handleNewModalClose}></div>)}
            <div className={css.searchAndNew}>
                <form onSubmit={() => console.log("searchuser...")}>
                    <input className={css.searchByKeyword}
                        placeholder='오늘은 어떤 구름에 참가하고 싶나요?'
                        value={searchTerm}
                        onChange={(e)=> {setSearchTerm(e.target.value);
                            if(e.target.value == ""){
                                setSelected("전체");
                            } else {
                                setSelected("");
                            } // 키워드를 입력하면 카테고리 ("") 아예 해당없게 + 키워드 없으면 "전체"로 세팅해줌.
                        }}
                    >
                    </input>
                    <button className={css.searchButton}><img src={search}></img></button>
                </form>
                {isNewModalOpen &&
                    <NewGroupMake
                        className={css.newGroupMake}
                        isOpen={isNewModalOpen}
                        close={handleNewModalClose}
                        hostId={userId}
                    />}
                <button className={css.newGoorm} onClick={handleNewModalOpen}>
                    <p className={css.newFloat}>구름 띄우기</p>
                </button>
            </div>
            <div className={css.selector}>
                {filter.map(option => (
                    <button
                        key={option}
                        className={selected === option ? `${css.clicked}` : `${css.notClicked}`}
                        onClick={() => {handleOptionClick(option);
                            setSearchTerm("");
                        }} // 카테고리를 누르면 모든 검색어가 초기화 + 검색결과가 없는게 아니라서 조건문 != 으로 회피
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div>
                <img className={css.underbar} src={underbar}></img>
            </div>
            {isDetailModalOpen &&
                <DetailModal
                    isOpen={isDetailModalOpen}
                    close={handleDetailModalClose}
                    groupId={modalById}
                />
            }
            <div>
                {termFilteredGroups.length === 0 && searchTerm != "" ? (
                    <div className={css.partyContainer}>
                        <div className={css.noGroupText}>
                            <p>아직 생성된 구름이 없어요. </p>
                            <p>우측 상단의 <span>구름 띄우기</span>를 눌러 새로운 구름을 띄워보세요!</p>
                        </div>
                    </div>
                ) : (
                    <ul className={css.partyContainer}>
                        {termFilteredGroups.map((group) => (
                            <a className={css.groups} key={group.groupId} onClick={() => handleDetailModalOpen(group.groupId)}>
                                <Goorm className={css.goorm} value={group} />
                            </a>
                        ))}
                    </ul>
                )}
                {(filteredGroups.length === 0 && selected != "") ? (
                    <div className={css.partyContainer}>
                        <div className={css.noGroupText}>
                            <p>아직 생성된 구름이 없어요. </p>
                            <p>우측 상단의 <span>구름 띄우기</span>를 눌러 새로운 구름을 띄워보세요!</p>
                        </div>
                    </div>
                ) : (
                    <ul className={css.partyContainer}>
                        {filteredGroups.map((group) => (
                            <a className={css.groups} key={group.groupId} onClick={() => {handleDetailModalOpen(group.groupId); console.log(group.groupId)}}>
                                <Goorm className={css.goorm} value={group} />
                            </a>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}