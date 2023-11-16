import React, { useState } from "react"
import {Link} from "react-router-dom";
import styles from "../css/signin.module.css";
import axios from "axios";

export default function Signin() {
    

    

    const signinData = async (e : any) => {
        const res = await axios({
            url: 'http://localhost:8080',
            method: 'POST',
            data: {
                userid: e.target.id.value,
                password: e.target.password.value
            }
        });

        if (res.data.result) {
            alert('로그인이 되었습니다');
            document.location.href = '/';
          } else {
            document.location.reload();
          }
    }


    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.main}>
                    <input className={styles.id} name="id" placeholder="ID"/>
                    <input className={styles.password} name="password" placeholder="Password"/>
                    <button className={styles.signinBtn}>로그인</button>
                    <button className={styles.kakaoBtn} type="button" onClick={signinData}>카카오로 로그인</button>
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