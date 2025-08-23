import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import search from "../images/search.png";
import styles from '../styles/header.module.css';

function Header() {
    const navigate = useNavigate();

    return (
        <header>
            <button className={styles['logo']} onClick={() => navigate("/")}>
                <img src={logo} alt="logo"/>
            </button>
            <div className={styles['search-container']}>
                <input type="text" placeholder="회사명 | 직무 검색"/>
                <button>
                    <img src={search} alt="search"/>
                </button>
            </div>

            <div className={styles['header-buttons']}>
                <button onClick={() => navigate("/login")}>로그인</button>
                <button onClick={() => navigate("/register")}>회원가입</button>
            </div>
        </header>
    );
}

export default Header;
