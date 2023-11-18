import { useState } from "react";
import { useNavigate } from "react-router-dom";
import goormImage from "../images/goorm_login.svg";
import css from "./Login.module.css";
import showPwd from '../images/showPwd.svg';

const Login = () => {
    const movePage = useNavigate();
    const [formData, setFormData] = useState({
        userEmail: '',
        userPassword: ''
    });

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 비밀번호 보여주기 토글버튼
    const [isShow, setShow] = useState(false);
    const showOrNot = () => {
        setShow((prev) => !prev);
    }

    // 로그인 실패시 안내문구
    const [isWrong, setWrong] = useState(false);
    const showWrongSign = () => {
        setWrong(true);
    }

    const handleLogin = async (e) => {
        localStorage.setItem("key", "please...");
        movePage('/main');
        e.preventDefault();
        const apiURL = 'https://goormoagit-afdgu.run.goorm.site/login';
        const requestbody = {
            userEmail: formData.userEmail,
            userPassword: formData.userPassword,
            // 각각 Id, pwd로 바꿀것
        };
        try {
            const res = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestbody),
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                const authToken = data.token;
                const userId = data.userId;
                localStorage.setItem("key", authToken);
                movePage('/main');
            } else {
                console.log("Login failed");
                showWrongSign();
                alert("login Failed");
            }
        } catch (error) {
            console.error('Error', error)
        }
    }
    return (
        <div className={css.loginPage}>
            <div className={css.login}>
                <form onSubmit={handleLogin} className={css.inputs}>
                    <div className={css.logo}>
                        <img className={css.goormImage} src={goormImage} />
                        <p className={css.goormLogo}>GROOMOA</p>
                    </div>
                    <div>
                        <input
                            className={css.idpwd}
                            id="idInput"
                            type="text"
                            name="userEmail"
                            placeholder="이메일을 입력하세요"
                            autoComplete="off"
                            value={formData.userEmail}
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <input
                            className={css.idpwd}
                            id="pwdInput"
                            type={isShow ? "text" : "password"}
                            name="userPassword"
                            placeholder="비밀번호를 입력하세요"
                            autoComplete="off"
                            value={formData.userPassword}
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <div className={css.showPwdDiv}>
                            <img src={showPwd} className={css.showPwd} onClick={showOrNot}></img>
                        </div>
                    </div>
                    <div className={css.buttons}>
                        <button type="submit" className={css.loginButton} onSubmit={handleLogin}>로그인</button>
                        <button className={css.signUpButton} onSubmit={handleLogin}>회원가입</button>
                    </div>
                    {isWrong && <p className={css.wrong}>이메일 또는 비밀번호를 잘못 입력했습니다.</p>}
                    <div className={css.testInfo}>
                        <p> [ Test User Login Info ] </p>
                        <p>ID: '@goormoa1'</p>
                        <p>PASSWORD: '@goormoa'</p>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default Login;
