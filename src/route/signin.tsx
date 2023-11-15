import React from "react"
import {Link} from "react-router-dom";
import styles from "../css/signin.module.css";

export default function Signin() {

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.main}>
                    <input className={styles.id} placeholder="ID"/>
                    <input className={styles.password} placeholder="Password"/>
                    <button className={styles.signinBtn}>로그인</button>
                    <button className={styles.kakaoBtn}>카카오로 로그인</button>
                </div>
                <div className={styles.Link}>
                    <Link className={styles.signup} to="/signup">회원가입</Link>
                    |
                    <Link className={styles.findPassword} to="#"> 비밀번호 찾기</Link>
                </div>
            </div>
        </div>
        
    )
}