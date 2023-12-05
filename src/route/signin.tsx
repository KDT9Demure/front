import React, { useState } from "react"
import { Link } from "react-router-dom";
import styles from "../css/signin.module.css";
import axios from "axios";
import { Cookies } from "react-cookie";
import kakao from "assets/kakao_login_large_narrow.png";

// import {} as dotenv from 'dotenv';
// dotenv.config();

export default function Signin() {

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const signinData = async () => {
        const res = await axios({
            url: 'http://localhost:8000/user/signin',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {
                userid: id,
                password: pw,
            }
        });
        console.log(res.data)

        if (res.data.result) {
            alert("로그인이 되었습니다.");
            document.location.href = "/";

            //쿠키에 value로 token 넣기
            const cookie = new Cookies();
            const token = res.data.accessToken;
            cookie.set("DEMURE", token);

        } else {
            alert("로그인에 실패하셨습니다.");
            document.location.reload();
        }
    }


    const kakaoSignIn = async () => {
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_APIKEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code`;
        window.location.href = kakaoURL;
    }


    return (
        <div className={styles.bodys}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.main}>
                        <input className={styles.id} name="id" type="id" placeholder="ID" onChange={e => { setId(e.target.value); }} />
                        <input className={styles.password} name="password" type="password" placeholder="Password" onChange={e => { setPw(e.target.value) }} onKeyDown={(e) => {
                            if(e.key === "Enter") {signinData()} //enter키로 로그인
                        }}/>
                        <button className={styles.signinBtn} type="button" onClick={signinData}>로그인</button>
                        <img src={'assets/kakao_login_large_wide.png'} alt="카카오 로그인" onClick={kakaoSignIn} className={styles.kakaoBtn}></img>
                    </div>
                    <div className={styles.Link}>
                        <Link className={styles.signup} to="/signup">회원가입</Link>
                        |
                        <Link className={styles.findPassword} to="/find/password"> 비밀번호 찾기</Link>
                    </div>
                </div>
            </div>
        </div>


    )
}