import styles from '../styles/Register.module.css';

export default function Register() {
    return (
        <div className={styles.mainpage}>

            {/* Hero */}
            <section className={styles.hero}>
                <section className={styles.panel}>
                    <p>회원가입하고 다양한 혜택을 누리세요!</p>
                    <hr/>
                    <form>
                        <table>
                            <tbody>

                            <tr>
                                <td>
                                    <label><input type="text" placeholder={"이름"}></input></label>
                                </td>
                            </tr>
                                <tr>
                                    <td>
                                        <label><input type="text" placeholder={"아이디"}></input></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="password" placeholder={"비밀번호"}></input></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label><input type="text" placeholder={"이메일"}></input></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button type={"submit"}  className={styles.loginbtn}>회원가입</button>
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
