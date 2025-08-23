import styles from '../styles/Login.module.css';

export default function Login() {
    return (
        <div className={styles.mainpage}>

            {/* Hero */}
            <section className={styles.hero}>
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
            </section>
        </div>
    );
}
