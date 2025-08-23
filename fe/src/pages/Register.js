import { useState } from 'react';
import styles from '../styles/Register.module.css';

export default function Register() {
    const [name, setName] = useState('');
    const [memberId, setMemberId] = useState('');
    const [pw, setPw] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/member/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, member_id: memberId, pw, email }),
                credentials: "include", // 쿠키/세션 허용
            });

            if (!response.ok) {
                throw new Error("서버 응답 오류");
            }

            const message = await response.text();
            alert(message);
        } catch (err) {
            alert("회원가입 실패: " + err.message);
        }
    };


    return (
        <div className={styles.mainpage}>
            {/* Hero */}
            <section className={styles.hero}>
                <section className={styles.panel}>
                    <p>회원가입하고 다양한 혜택을 누리세요!</p>
                    <hr/>
                    <form onSubmit={handleRegister}>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            placeholder="이름"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            placeholder="아이디"
                                            value={memberId}
                                            onChange={(e) => setMemberId(e.target.value)}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        <input
                                            type="password"
                                            placeholder="비밀번호"
                                            value={pw}
                                            onChange={(e) => setPw(e.target.value)}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            placeholder="이메일"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="submit" className={styles.loginbtn}>회원가입</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </section>
            </section>
        </div>
    );
}
