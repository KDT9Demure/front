import React, { useState, useEffect } from "react"
import styles from "../css/findpw.module.css";
import axios from "axios";



export default function FindPw() {
    const [toggleComp, setToggleComp] = useState<boolean>(false);
    const [name, setName] = useState<string | null>();
    const [id, setId] = useState<string | null>();

    const [author, setAuthor] = useState<string | null>(null);
    const [authorInput, setAuthorInput] = useState<string | null>(null);

    const [IsIdTrue, setIsIdTrue] = useState<boolean | null>(null);
    const [isEmailBtnVisible, setIsEmailBtnVisible] = useState(true);

    const [authorToggle, setAuthorToggle] = useState<boolean | null>(false);

    const [isAuthorTrue, setIsAuthorTrue] = useState<boolean | null>(null);

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
        alert(`${res.data.email} 로 인증번호가 전송되었습니다`)
        setAuthorToggle(true)
        setIsActive(true)
        if (res.data.result) {
            setAuthor(res.data.verifyNumber)
            setIsEmailBtnVisible(false)
        }
        else {
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
            // setisEmailBtnVisible(false)
        } else {
            setIsAuthorTrue(false)
        }
    }

    // 인증번호 재전송
    // const reAuthorBtn = async () => {
    //     if (IsIdTrue) {


    //         const res = await axios({
    //             method: "post",
    //             url: "http://localhost:8000/user/email",
    //             data: {
    //                 useremail: email
    //             }
    //         })
    //         console.log(res.data)
    //         alert("인증번호가 발송되었습니다")
    //         setIsActive(true)
    //         setTime(20)
    //         if (res.data.result) {
    //             setAuthor(res.data.verifyNumber)

    //         }

    //     }
    // }

    return (

        <div className={styles.bodys}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.main}>
                        <h2>비밀번호 찾기</h2>
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
                                        <button className={styles.emailNumberConfirmBtn} type="button" >
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

                    </div>
                </div>
            </div>
        </div>


    )
}
