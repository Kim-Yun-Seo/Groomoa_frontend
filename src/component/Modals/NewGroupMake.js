import css from "./NewGroupMake.module.css";
import closeImg from "../../images/close.svg";
import { useState } from "react";

const NewGroupMake = ({ isOpen, close, hostId }) => {
    const today = new Date();
    const fDate = today.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

    const initialYear = today.getFullYear();
    const initialMonth = today.getMonth() + 1;
    const initialDay = today.getDate();

    const [selectedYear, setSelectedYear] = useState(initialYear);
    const [selectedMonth, setSelectedMonth] = useState(initialMonth);
    const [selectedDay, setSelectedDay] = useState(initialDay);

    const handleYearChange = (e) => { setSelectedYear(parseInt(e.target.value, 10)); };
    const handleMonthChange = (e) => { setSelectedMonth(parseInt(e.target.value, 10)); };
    const handleDayChange = (e) => { setSelectedDay(parseInt(e.target.value, 10)); };
    const getFormattedDate = () => {
        const month = selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth;
        const day = selectedDay < 10 ? `0${selectedDay}` : selectedDay;
        return `${selectedYear}-${month}-${day}`;
    };

    const [modalOpen, setOpen] = useState(isOpen);
    const handleClose = () => { setOpen(false); close(); }

    const category = ["게임", "스터디", "프로젝트", '문화', '운동', '사교', '여행', '기타'];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleCategoryClick = (category) => { setSelectedCategory(category === selectedCategory ? null : category); };

    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const authToken = localStorage.getItem("key");
    const apiURL = "http://3.34.179.233/group";
    const body = {
        "groupTitle": title,
        "groupInfo": detail,
        "maxCount": maxParticipants,
        "category": selectedCategory,
        "closeDate": "2023-11-21T17:30:00"
    }
    console.log(JSON.stringify(body));

    const postGroup = async () => {
        try {
            const res = await fetch(apiURL, {
                method : "POST",
                headers : {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(body),
            });
        } catch(error) {
            console.error('Error posting data:', error);
        }
    }

    const handleSubmitClick = () => {
        postGroup();
        setOpen(false);  close();
    }

    return (
        <div className={css.newModalPage}>
            <div className={css.closeDiv}>
                <button className={css.closeBtn} onClick={handleClose}><img className={css.closeImg} src={closeImg} /></button>
            </div>
            <div className={css.mainData}>
                <p className={css.nowDate}>{fDate}</p>
                <input className={css.title} maxLength={15}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력해주세요 (최대 15자)"></input>
                <input className={css.detail} minLength={10}
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    placeholder="세부 내용을 입력해주세요 (최소 10글자)"></input>
                <div>
                    <div className={css.setting}>
                        <p className={css.p_setting}>모집인원</p>
                        <input className={css.numLimit} placeholder="숫자를 입력하세요 (0~100)"
                            value={maxParticipants}
                            onChange={(e)=> setMaxParticipants(e.target.value)}
                        ></input>
                    </div>
                    <div className={css.setting}>
                        <p className={css.p_setting_2}>마감기한</p>
                        <div>
                            <select className={css.dateBtn} value={selectedYear} onChange={handleYearChange}>
                                {Array.from({ length: 9 }, (_, index) => (
                                    <option key={index} value={initialYear + index}>{initialYear + index}년</option>
                                ))}
                            </select>
                            <select className={css.dateBtn} value={selectedMonth} onChange={handleMonthChange}>
                                {Array.from({ length: 12 }, (_, index) => (
                                    <option key={index} value={index + 1}>{index + 1}월</option>
                                ))}
                            </select>
                            <select className={css.dateBtn} value={selectedDay} onChange={handleDayChange}>
                                {Array.from({ length: 31 }, (_, index) => (
                                    <option key={index} value={index + 1}>{index + 1}일</option>
                                ))}
                            </select>
                        </div>
                    </div>
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
                    <button className={css.completeBtn} onClick={handleSubmitClick}>구름 띄우기</button>
                </div>
            </div>


        </div>
    )
}

export default NewGroupMake;