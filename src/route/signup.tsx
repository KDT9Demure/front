import React, { useState, useEffect } from "react"

import axios from "axios";

// import { useForm, SubmitHandler } from "react-hook-form"

import styles from "../css/signup.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false


export default function Signup() {


    const [userid, setUserid] = useState<string | null>(null);
    const [isIdTrue, setIsIdTrue] = useState<boolean | null>(null);

    const [password, setPassword] = useState<string | null>(null);
    const [isPwTrue, setIsPwTrue] = useState<boolean | null>(null);

    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);

    const [name, setName] = useState<string | null>(null);

    const [email, setEmail] = useState<string>('');
    const [IsEmailTrue, setIsEmailTrue] = useState<boolean | null>(null);
    const [isEmailBtnVisible, setEmailBtnVisible] = useState(true);

    const [authorToggle, setAuthorToggle] = useState<boolean | null>(false);
    const [author, setAuthor] = useState<string | null>(null);
    const [authorInput, setAuthorInput] = useState<string | null>(null);
    const [isAuthorTrue, setIsAuthorTrue] = useState<boolean | null>(null);

    // const [emailReadonly, setEmailReadonly] = useState<boolean | null>(null);

    //회원가입 온클릭
    const sgup = async (data: any) => {
        const info = {
            userid: userid,
            email: email,
            user_name: name,
            password: password
        }
        if (name?.length === 0) {
            alert("이름을 입력해 주세요")
            return;
        }
        if (isIdTrue === true && isPwTrue === true && isPasswordMatch === true && IsEmailTrue === true && isAuthorTrue === true) {
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
                document.location.href = "/signin"
                return;
            }
        } else if (isIdTrue === true && isPwTrue === true && isPasswordMatch === true && IsEmailTrue === true && isAuthorTrue === false || isAuthorTrue === null) {
            alert("이메일이 인증되지 않았습니다")
            return;
        } else {
            alert("입력한 정보를 확인해 주세요")
            return;
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

        // 비밀번호 확인과 일치 여부 검사
        const isMatching: boolean = confirmPassword === newPassword;
        if (newPassword === null || confirmPassword === null) {
            setIsPasswordMatch(null)
        } else if (newPassword.length > 0 && confirmPassword.length > 0) {
            setIsPasswordMatch(isMatching);
        } else {
            setIsPasswordMatch(null)
        }
    };

    //비밀번호 확인
    const confirmPw = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword: string = e.target.value;
        setConfirmPassword(newConfirmPassword);

        // 비밀번호와 일치 여부 검사
        const isMatching: boolean = newConfirmPassword === password;
        if (password === null || newConfirmPassword === null) {
            setIsPasswordMatch(null)
        } else if (password.length > 0 && newConfirmPassword.length > 0) {
            setIsPasswordMatch(isMatching)
        } else {
            setIsPasswordMatch(null)
        }


    };
    //이름 확인
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

    //이메일 인증 온클릭
    const authorToggleBtn = async () => {
        if (IsEmailTrue) {
            console.log(email)

            const res = await axios({
                method: "post",
                url: "http://localhost:8000/user/email",
                data: {
                    useremail: email
                }
            })
            console.log(res.data)
            alert("인증번호가 발송되었습니다")
            setAuthorToggle(true)
            setIsActive(true)
            if (res.data.result) {
                setAuthor(res.data.verifyNumber)
            }
            setEmailBtnVisible(false)
        } else {
            alert("이메일 형식을 확인해 주세요")
        }
    }

    // 인증번호 인풋 값 체크
    const authorCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAuthor: string = e.target.value;
        setAuthorInput(newAuthor)
    }

    // 인증번호 확인 온클릭
    const authorBtn = () => {
        if (authorInput === author) {
            setIsAuthorTrue(true)
            setIsActive(false)
        } else {
            setIsAuthorTrue(false)
        }
    }

    // 이메일 인증시 인풋 리드온리
    const emailInput = document.getElementById('emailInput') as HTMLInputElement;
    if (isAuthorTrue === true) {
        emailInput.readOnly = true

    }

    // 타이머

    const [time, setTime] = useState<number>(20); // 시간(초)
    const [isActive, setIsActive] = useState<boolean | null>(null);
    const [timerZero, setTimerZero] = useState<boolean | null>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }
        if (time === 0) {
            setTimerZero(true);
        } else {
            setTimerZero(false);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isActive, time]);


    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    // 인증번호 재전송
    const reAuthorBtn = async () => {
        if (IsEmailTrue) {
            console.log(email)

            const res = await axios({
                method: "post",
                url: "http://localhost:8000/user/email",
                data: {
                    useremail: email
                }
            })
            console.log(res.data)
            alert("인증번호가 발송되었습니다")
            setIsActive(true)
            setTime(20)
            if (res.data.result) {
                setAuthor(res.data.verifyNumber)

            }

        }
    }
    ////////////////////


    return (
        <div className={styles.bodys}>
            <div className={styles.container}>
                <form className={styles.form}>

                    <div className={styles.iconContainer}>
                        <input
                            className={styles.id} placeholder="ID" onChange={idCheck} maxLength={20} />

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
                                8자 이상 / 숫자,문자,특수문자를 포함해 주세요
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

                    <div className="messageDiv">
                        <input

                            className={styles.email} placeholder="Email" type="text" onChange={emailCheck} id="emailInput" />
                        {IsEmailTrue === false ? (
                            <span style={{ color: 'red' }}>이메일 형식을 확인해 주세요</span>
                        ) : IsEmailTrue === true ? (
                            <span style={{ color: "green" }}>
                                알맞은 이메일 형식입니다
                            </span>
                        ) : null}
                    </div>



                    {isEmailBtnVisible && (
                        <button className={styles.emailBtn} onClick={authorToggleBtn} type="button">
                            이메일 인증
                        </button>
                    )}


                    {authorToggle && (
                        <div>
                            <div className={styles.emailDiv}>

                                <input

                                    className={styles.emailNumber} placeholder="Author Number" maxLength={6} onChange={authorCheck} />


                                {timerZero ? (
                                    <button className={styles.emailNumberConfirmBtn} type="button" onClick={reAuthorBtn}>
                                        재전송
                                    </button>
                                ) : (
                                    <button className={styles.emailNumberConfirmBtn} type="button" onClick={authorBtn}>
                                        확인
                                    </button>
                                )}
                                <div className={styles.timer}>
                                    {formatTime(time)}
                                </div>
                                {isAuthorTrue === false ? (
                                    <span style={{ color: 'red' }}>인증번호가 틀립니다</span>
                                ) : isAuthorTrue === true ? (
                                    <span style={{ color: "green" }}>
                                        인증이 완료되었습니다
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    )}
                    <button className={styles.signupBtn} type="button" onClick={sgup}>회원가입</button>
                </form>
            </div>
        </div>

    )
}


