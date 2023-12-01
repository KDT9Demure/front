import React, { useState, useEffect } from "react"
import styles from "../css/findpw.module.css";
import axios from "axios";

export default function FindPw() {

    const [toggleComp, setToggleComp] = useState<boolean>(false);

    const [name, setName] = useState<string | null>();
    const [id, setId] = useState<string | null>();

    const [author, setAuthor] = useState<string | null>(null);
    const [authorInput, setAuthorInput] = useState<string | null>(null);
    const [authorToggle, setAuthorToggle] = useState<boolean | null>(false);

    const [idNumber, setIdNumber] = useState<number | null>(null);
    const [isEmailBtnVisible, setIsEmailBtnVisible] = useState(true);

    const [isAuthorTrue, setIsAuthorTrue] = useState<boolean | null>(null);

    const [password, setPassword] = useState<string | null>(null);
    const [isPwTrue, setIsPwTrue] = useState<boolean | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);

    //이름 확인
    const nameCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName: string = e.target.value;
        setName(newName)
    }
    //아이디 확인
    const idCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newId: string = e.target.value;
        setId(newId)
    }

    // 타이머
    const [time, setTime] = useState<number>(60); // 시간(초)
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

    //인증번호 전송 온클릭
    const authorToggleBtn = async () => {
        const res = await axios({
            method: "post",
            url: "http://localhost:8000/user/password/find",
            data: {
                id: id,
                user_name: name
            }
        })
        console.log(res.data)
        if (res.data.result) {
            setAuthor(res.data.verifyNumber)
            setIdNumber(res.data.id)
            setIsEmailBtnVisible(false)
            alert(`${res.data.email} 으로 인증번호가 전송되었습니다`)
            setAuthorToggle(true)
            setIsActive(true)
        }
        else {
            alert("사용자 정보를 확인해주세요")
            return;
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
            alert("인증이 완료되었습니다. 비밀번호를 변경해주세요.")
            setToggleComp(true)
        } else {
            setIsAuthorTrue(false)
        }
    }

    // 인증번호 재전송
    const reAuthorBtn = async () => {
        const res = await axios({
            method: "post",
            url: "http://localhost:8000/user/password/find",
            data: {
                id: id,
                user_name: name
            }
        })
        console.log(res.data)
        if (res.data.result) {
            setAuthor(res.data.verifyNumber)
            setIdNumber(res.data.id)
            alert(`${res.data.email} 으로 인증번호가 재전송되었습니다`)
            setIsActive(true)
            setTime(60)
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

    const editConfirm = async () => {

        if (isPwTrue === true && isPasswordMatch === true) {
            const res = await axios({
                method: "patch",
                url: "http://localhost:8000/user/password/find/update",
                data: {
                    id: idNumber,
                    password: password
                }
            })
            console.log(res.data)
            alert("비밀번호가 변경되었습니다.")
            window.location.href = "/signin"
            return;
        } else {
            alert("입력한 정보를 확인해주세요")
        }
    }

    if (toggleComp === false) {
        return (
            <div className={styles.bodys}>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div className={styles.main}>
                            <div className={styles.title}>
                                <h2 >비밀번호 찾기</h2>
                            </div>
                            <div style={{ fontSize: 16, fontWeight: "bold" }}>가입시 기재한 아이디와 이름을 입력해 주세요</div>

                            <input type="text" maxLength={20} className={styles.password} onChange={idCheck} placeholder="ID" />
                            <input type="text" maxLength={20} className={styles.password} onChange={nameCheck} placeholder="Name" />
                            {isEmailBtnVisible && (
                                <button className={styles.signinBtn} onClick={authorToggleBtn} type="button">인증번호 전송</button>
                            )}

                            {authorToggle && (
                                <div>
                                    <div className={styles.emailDiv}>
                                        <input
                                            className={styles.emailNumber} placeholder="Author Number" maxLength={6} onChange={authorCheck} />
                                        {timerZero ? (
                                            <button className={styles.emailNumberConfirmBtn} type="button" onClick={reAuthorBtn} >
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
                                        <br />
                                        {isAuthorTrue === false ? (
                                            <span className={styles.authorText}>인증번호가 틀립니다</span>
                                        ) : null}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <>
                <div className={styles.bodys}>
                    <div className={styles.container}>
                        <div className={styles.wrapper}>
                            <div className={styles.main}>
                                <div className={styles.title}>
                                    <h2 >비밀번호 변경</h2>
                                </div>

                                <div className={styles.pwEditDiv}>
                                    <input
                                        className={styles.password} placeholder="Password" type="password"
                                        onChange={pwCheck} defaultValue={""} />
                                    <br />
                                    {isPwTrue === true ? (
                                        <span style={{ color: 'green', fontSize: 13, fontWeight: "bold" }}>사용가능한 비밀번호입니다.</span>
                                    ) : isPwTrue === false ? (
                                        <span style={{ color: 'red', fontSize: 13, fontWeight: "bold" }}>
                                            8자 이상 / 숫자,문자,특수문자를 포함해 주세요
                                        </span>
                                    ) : null}
                                    <br />

                                    <input

                                        className={styles.password} placeholder="Confirm Password" type="password"
                                        onChange={confirmPw} />
                                    <br />
                                    {isPasswordMatch === true ? (
                                        <span style={{ color: 'green', fontSize: 13, fontWeight: "bold" }}>비밀번호 일치</span>
                                    ) : isPasswordMatch === false ? (
                                        <span style={{ color: 'red', fontSize: 13, fontWeight: "bold" }}>
                                            비밀번호가 일치하지 않습니다
                                        </span>
                                    ) : null}
                                </div>
                                <button className={styles.signinBtn} type="button" onClick={editConfirm}>확인</button>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

