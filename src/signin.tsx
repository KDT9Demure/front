import React from "react"
import {Link} from "react-router-dom";

export default function Signin() {

    return (
        <div className="signinContainer">
            <span className="signinTitle">Demure</span>
            <div className="signinWrapper">
                <input className="id"/>
                <input className="password"/>
                <button className="signBtn">로그인</button>
                <Link to="/signup">회원가입</Link> | 비밀번호찾기
            </div>
        </div>
    )
}