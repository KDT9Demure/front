import React, { useState } from "react"
import { Link } from "react-router-dom";
import styles from "../css/signin.module.css";
import axios from "axios";
import { Cookies } from "react-cookie";

export default function ProfileEdit() {

    const [pw, setPw] = useState("");

    return (
        <div className={styles.bodys}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.main}>
                        {/* <input className={styles.id} name="id" type="id" placeholder="ID" onChange={e => { setId(e.target.value); }} /> */}
                        <input className={styles.password} name="password" type="password" placeholder="Password" onChange={e => { setPw(e.target.value); }} />
                        {/* <button className={styles.signinBtn} type="button" onClick={signinData}>로그인</button> */}

                    </div>
                </div>
            </div>
        </div>


    )
}