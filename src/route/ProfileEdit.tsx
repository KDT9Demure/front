import React, { useState } from "react"
import { Link } from "react-router-dom";
import styles from "../css/profileedit.module.css";
import axios from "axios";
import { Cookies } from "react-cookie";

export default function ProfileEdit() {

    const [pw, setPw] = useState("");
    const [toggleComp, setToggleComp] = useState<boolean>(false)

    const confirm = () => {
        //비밀번호가 일치하면
        setToggleComp(true)

    }
    if (toggleComp === false) {
        return (

            <div className={styles.bodys}>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div className={styles.main}>
                            <div>비밀번호를 한번 더 입력해 주세요.</div>
                            <input className={styles.password} name="password" type="password" placeholder="Password" onChange={e => { setPw(e.target.value); }} />
                            <button className={styles.signinBtn} onClick={confirm} type="button">확인</button>

                        </div>
                    </div>
                </div>
            </div>


        )
    } else {
        return (
            <div className={styles.bodys}>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div className={styles.main}>
                            <h2>회원정보 수정</h2>
                            <div style={{ margin: 25 }}>
                                <h3>이름</h3>
                                <input type="text" value={"???"} className={styles.password} />
                                <br /><br />
                                <h3>이메일</h3>
                                <input type="text" value={"???"} className={styles.password} />
                                <br /><br />
                                <h3>비밀번호</h3>
                                <input type="password" value={"???"} className={styles.password} />
                                <br /><br />
                                <h3>비밀번호 확인</h3>
                                <input type="password" value={"???"} className={styles.password} />
                                <button className={styles.signinBtn} onClick={confirm} type="button">확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

