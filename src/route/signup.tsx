import React, { FC, useRef, useState } from "react"

import axios from "axios";

import { useForm, SubmitHandler } from "react-hook-form"

import styles from "../css/signup.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false

// interface FormValue {
//     id: string
//     password: string
//     confirmPassword: string
//     name: string
//     email: string
//     emailNumber: string
// }
// const signupForm: FC = () => {

//     return(
//         <>

//         </>
//     )
// }

export default function Signup() {

    // const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValue>({})
    // const onVaild = async (data: any) => {
    //     const info = {
    //         userid: data.id,
    //         email: data.email,
    //         user_name: data.name,
    //         password: data.password
    //     }
    //     const res = await axios({
    //         method: "post",
    //         url: 'http://localhost:8000/user/signup',
    //         data: info
    //     })
    //     console.log(data)
    //     console.log(res.data)
    //     if (res.data.result) {
    //         alert("회원가입 완료")
    //     }

    // };

    // //아이디값 빼오기
    // const idValue = useRef<string | null>(null)
    // idValue.current = watch("id")
    // console.log(userid)

    // {/* 비밀번호 / 비밀번호 확인 일치를 검증하기 위해 password input 의 value 를 추적함*/ }
    // const passwordRef = useRef<string | null>(null)
    // passwordRef.current = watch("password")

    // // 이메일 인풋 값 빼오기
    // const emailAuthor = useRef<string | null>(null)
    // emailAuthor.current = watch("email")

    // // 인증번호 인풋 값 빼오기
    // const emailNumber = useRef<string | null>(null)
    // emailNumber.current = watch("emailNumber")

    // //이메일 인증번호 전송 온클릭
    // const emailCheck = async () => {
    //     const data = emailAuthor.current
    //     const res = await axios({
    //         method: "post",
    //         url: "http://localhost:8000/user/email",
    //         data
    //     })
    //     console.log(data)

    // }
    // //인증번호 확인 온클릭
    // const authorConfirm = async () => {
    //     // const res = await axios({
    //     //     method: "post",
    //     //     url: "http://localhost:8000/user/email",
    //     //     data
    //     // })
    //     console.log("인증번호 확인")
    // }


    //DOM접근할수 있는 방법 찾기
    const [userid, setUserid] = useState<string | null>(null);
    const [isIdTrue, setIsIdTrue] = useState<boolean | null>(null);

    const [password, setPassword] = useState<string | null>(null);
    const [isPwTrue, setIsPwTrue] = useState<boolean | null>(null);

    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);

    const [name, setName] = useState<string | null>(null);

    const [email, setEmail] = useState<string>('');
    const [IsEmailTrue, setIsEmailTrue] = useState<boolean | null>(null);



    const sgup = async (data: any) => {
        const info = {
            userid: userid,
            email: email,
            user_name: name,
            password: password
        }
        if (isIdTrue === true && isPwTrue === true && isPasswordMatch === true && IsEmailTrue === true) {
            console.log("성공")
            console.log(userid, email, name, password)
            const res = await axios({
                method: "post",
                url: 'http://localhost:8000/user/signup',
                data: info
            })
            console.log(data)
            console.log(res.data)
            if (res.data.result) {
                alert("회원가입 완료")
            }
        } else {
            alert("입력한 정보를 확인해 주세요")
        }
    };


    //아이디 중복체크
    const idCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newId: string = e.target.value
        setUserid(newId)


        const res = await axios({
            method: "post",
            url: "http://localhost:8000/user/duplicate",
            data: {
                userid: newId
            }
        })
        console.log(res.data)
        if (res.data.result === true) {
            setIsIdTrue(true);
        } else {
            setIsIdTrue(false);
        }
        if (newId === "") {
            setIsIdTrue(false);
        }

    }

    //비밀번호 체크
    const pwCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword: string = e.target.value;
        setPassword(newPassword);

        // 비밀번호 유효성 검사 정규식
        const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const isValid: boolean = passwordRegex.test(newPassword);
        setIsPwTrue(newPassword === '' ? null : isValid);

    };

    //비밀번호 확인
    const confirmPw = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword: string = e.target.value;
        setConfirmPassword(newConfirmPassword);

        setIsPasswordMatch(password === '' ? null : password === newConfirmPassword);
    };
    //이름
    const nameCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName: string = e.target.value;
        setName(newName)
    }

    //이메일 확인
    const emailCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail: string = e.target.value;
        setEmail(newEmail);
        // 이메일 유효성 검사 정규식
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid: boolean = emailRegex.test(newEmail);
        setIsEmailTrue(newEmail === '' ? null : isValid);
    };

    return (
        <div className={styles.container}>
            <form className={styles.form}>

                <div className={styles.iconContainer}>
                    <input
                        className={styles.id} placeholder="ID" onChange={idCheck} maxLength={20} />
                    {/* <button type="button" onClick={idCheck}>중복체크</button> */}

                    <div className={styles.icon}>

                        {isIdTrue === true && <FontAwesomeIcon icon={faCheck as IconProp} />}
                        {isIdTrue === false && <p>❌</p>}
                        {isIdTrue === null && <span></span>}
                    </div>
                </div>


                <div className="messageDiv">
                    <input

                        className={styles.password} placeholder="Password" type="password"
                        onChange={pwCheck} />
                    {isPwTrue === true ? (
                        <span style={{ color: 'green' }}>사용가능한 비밀번호입니다.</span>
                    ) : isPwTrue === false ? (
                        <span style={{ color: 'red' }}>
                            8자 이상/숫자,문자,특수문자를 포함해 주세요
                        </span>
                    ) : null}
                </div>

                <div className="messageDiv">
                    <input

                        className={styles.confirmPassword} placeholder="Confirm Password" type="password"
                        onChange={confirmPw} />
                    {isPasswordMatch === true ? (
                        <span style={{ color: 'green' }}>비밀번호 일치</span>
                    ) : isPasswordMatch === false ? (
                        <span style={{ color: 'red' }}>
                            비밀번호가 일치하지 않습니다
                        </span>
                    ) : null}
                </div>


                <input

                    className={styles.name} placeholder="Name" maxLength={20} onChange={nameCheck} />

                <div>
                    <span></span>
                </div>

                <div className="messageDiv">
                    <input

                        className={styles.email} placeholder="Email" type="text" onChange={emailCheck} />
                    {IsEmailTrue === false ? (
                        <span style={{ color: 'red' }}>이메일 형식을 확인해 주세요</span>
                    ) : IsEmailTrue === true ? (
                        <span style={{ color: "green" }}>
                            알맞은 이메일 형식입니다
                        </span>
                    ) : null}
                </div>


                <div>
                    <span></span>
                </div>

                <button className={styles.emailBtn} type="button" >이메일 인증</button>

                <div className={styles.emailDiv}>


                    <input

                        className={styles.emailNumber} placeholder="Author Number" maxLength={10} />

                    <button className={styles.emailNumberConfirmBtn} type="button">확인</button>
                </div>

                <div>
                    <span></span>
                </div>

                <button className={styles.signupBtn} type="button" onClick={sgup}>회원가입</button>

            </form>
        </div >

    )
}


