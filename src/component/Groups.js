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

    //temporary;;;
    const [userId, setUserId] = useState("1hvs243nfgh");
    const groupList = groupDummy;

    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [modalById, setModalById] = useState("");
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
    const handleNewModalOpen = () => {setNewModalOpen(true)};
    const handleNewModalClose = () => {setNewModalOpen(false)};

    return (
        <div className="pageBody">
            {(isNewModalOpen||isDetailModalOpen) && (<div className={css.darkOverlay} onClick={handleNewModalClose}></div>)}
            <div className={css.searchAndNew}>
                <form onSubmit={()=>console.log("searchuser...")}>
                    <input className={css.searchByKeyword}
                        placeholder='오늘은 어떤 구름에 참가하고 싶나요?'
                    >
                    </input>
                    <button className={css.searchButton}><img src={search}></img></button>
                </form>
                {isNewModalOpen && 
                    <NewGroupMake 
                    className={css.newGroupMake}
                    isOpen = {isNewModalOpen}
                    close = {handleNewModalClose}
                    hostId = {userId}
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
                        onClick={() => handleOptionClick(option)}
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
                {filteredGroups.length === 0 ? (
                    <div className={css.partyContainer}>
                        <div className={css.noGroupText}>
                            <p>아직 생성된 구름이 없어요. </p>
                            <p>우측 상단의 <span>구름 띄우기</span>를 눌러 새로운 구름을 띄워보세요!</p>
                        </div>
                    </div>
                ) : (
                    <ul className={css.partyContainer}>
                        {filteredGroups.map((group) => (
                            <a className={css.groups} key={group.group_id} onClick={() => handleDetailModalOpen(group.group_id)}>
                                <Goorm className={css.goorm} value={group} />
                            </a>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}