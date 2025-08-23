import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import search from "../images/search.png";
import styles from '../styles/header.module.css';

function Header({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // 토큰 제거
        setIsLoggedIn(false);
        navigate("/");
    }

    return (
        <header>
            <button onClick={() => navigate("/")}>
                <img className={styles['logo']} src={logo} alt="logo"/>
            </button>
            <div className={styles['search-container']}>
                <input type="text" placeholder="회사명 | 직무 검색"/>
                <button>
                    <img src={search} alt="search"/>
                </button>
            </div>

            <div className={styles['header-buttons']}>
                {isLoggedIn ? (
                    <>
                        <button onClick={() => navigate("/portfolio")}>포트폴리오</button>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate("/login")}>로그인</button>
                        <button onClick={() => navigate("/signup")}>회원가입</button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
