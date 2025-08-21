import styles from '../styles/Login.module.css';
import img from '../images/다운로드 (2).jpg';

export default function Login() {
    return (
        <div className={styles.mainpage}>
            <header className={styles.header}>
                <h1>JobMatch</h1>
                <nav className={styles.nav}>
                    <a href="#">채용공고</a>
                    <a href="#">기업분석</a>
                    <a href="#">마이페이지</a>
                </nav>
            </header>

            {/* Hero */}
            <section className={styles.hero}>
                <section className={styles.panel}>
                    <section>
                        <form>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label><input type="text" placeholder={"아이디"}></input></label>
                                        </td>
                                        <td rowSpan={2}>
                                            <button type={"submit"}  className={styles.loginbtn}>로그인</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label><input type="password" placeholder={"비밀번호"}></input></label>
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
