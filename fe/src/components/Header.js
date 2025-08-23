import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import search from "../images/search.png";
import '../styles/header.css';

function Header() {
    const navigate = useNavigate();

    return (
        <header>
            <button onClick={() => navigate("/")}>
                <img src={logo} alt="logo"/>
            </button>
            <div className="search-container">
                <input type="text" placeholder="회사명 | 직무 검색"/>
                <button>
                    <img src={search} alt="search"/>
                </button>
            </div>

            <div className="header-buttons">
                <button onClick={() => navigate("/login")}>로그인</button>
                <button onClick={() => navigate("/register")}>회원가입</button>
            </div>
        </header>
    );
}

export default Header;
