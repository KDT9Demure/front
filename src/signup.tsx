import React from "react"

export default function Signup() {

    return (

        <div className="signupContainer">
            <span className="signupTitle">Demure</span>
            <form className="signupForm">

                <input type="text" className="id" placeholder="ID" /><br />
                <input type="password" className="password" placeholder="Password" /><br />
                <input type="password" className="confirmPassword" placeholder="Confirm Password" /><br />
                <input type="text" className="name" placeholder="Name" /><br />
                <input type="email" className="email" placeholder="Email" /><br />
                <button className="emailBtn">이메일 인증</button><br />
                <input type="text" className="emailNumber" placeholder="Author Number" />
                <button className="emailNumberConfirm">확인</button><br />
                <button className="signupBtn">회원가입</button>

            </form>
        </div>

    )
}