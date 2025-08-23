import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Login.module.css';
import img from '../images/다운로드 (2).jpg';

export default function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/member/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberId: id, pw: password }) // <- 여기 수정
            });

            if (response.ok) {
                const token = await response.text();
                console.log(token);
                localStorage.setItem("token", token);
                setIsLoggedIn(true);
                alert("로그인 성공!");
                navigate("/");
            } else {
                alert("로그인 실패");
            }
        } catch (error) {
            console.error(error);
            alert("로그인 중 오류 발생");
        }
    }

    return (
        <div className={styles.mainpage}>
            <section className={styles.hero}>
                <section className={styles.panel}>
                    <section>
                        <form onSubmit={handleSubmit}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <label>
                                            <input
                                                type="text"
                                                placeholder="아이디"
                                                value={id}
                                                onChange={(e) => setId(e.target.value)}
                                            />
                                        </label>
                                    </td>
                                    <td rowSpan={2}>
                                        <button type="submit" className={styles.loginbtn}>로그인</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>
                                            <input
                                                type="password"
                                                placeholder="비밀번호"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </label>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                        <hr/>
                        <p style={{display:"inline"}}>계정이 없으신가요?</p>
                        <a href={""}> 회원가입</a>
                    </section>
                    <img src={img}/>
                </section>
            </section>
        </div>
    );
}
