import React, { useState } from "react"
import {Link} from "react-router-dom";
import styles from "../css/signin.module.css";
import axios from "axios";
import { Cookies } from "react-cookie";

export default function Signin() {
    
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    
    const signinData = async () => {
        const res = await axios({
            url: 'http://localhost:8000/user/signin',
            method: 'POST',
            headers:{'Content-Type' : 'application/json'},
            data: {
                userid: id,
                password: pw,
            }
        });
        console.log(res.data)

        if (res.data.result) {
            alert("로그인이 되었습니다.");
            // document.location.href = "/";

            //쿠키에 value로 token 넣기
            const cookie = new Cookies();
            const token = res.data.accessToken;
            cookie.set("NID", token);
            
          } else {
            alert("로그인에 실패하셨습니다.");
            document.location.reload();
          }
    }


    return (
        <div className={styles.bodys}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.main}>
                        <input className={styles.id} name="id" type="id" placeholder="ID" onChange={e => {setId(e.target.value);}}/>
                        <input className={styles.password} name="password" type="password" placeholder="Password" onChange={e => {setPw(e.target.value);}}/>
                        <button className={styles.signinBtn} type="button" onClick={signinData}>로그인</button>
                        <button className={styles.kakaoBtn}>카카오로 로그인</button>
                    </div>
                    <div className={styles.Link}>
                        <Link className={styles.signup} to="/signup">회원가입</Link>
                        |
                        <Link className={styles.findPassword} to="#"> 비밀번호 찾기</Link>
                    </div>
                </div>
            </div>
        </div>
        
        
    )
}