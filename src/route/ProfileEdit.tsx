import React, { useState } from "react"
import styles from "../css/profileedit.module.css";
import axios from "axios";
import { useAppSelector } from "../hook";


export default function ProfileEdit() {



    const userInfo = useAppSelector((state) => state.signin);
    const [pw, setPw] = useState<string>("");
    const [isPwTrue, setIsPwTrue] = useState<boolean | null>(null);
    const [toggleComp, setToggleComp] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>()

    const [name, setName] = useState<string | null>(userInfo.user_name);

    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);

    const confirm = async () => {
        const res = await axios({
            method: "post",
            url: `${import.meta.env.VITE_ADDRESS}/user/password/check`,
            data: {
                password: pw,
                userid: userInfo.userid
            }
        })
        console.log(res.data)
        if (res.data.result) {
            //비밀번호가 일치하면
            const res2 = await axios({
                method: "post",
                url: `${import.meta.env.VITE_ADDRESS}/user/profile/get`,
                data: {
                    id: userInfo.user_id
                }
            })
            setUserData(res2.data)
            console.log("유저데이터", res2.data)
            alert("본인확인 완료")
            setPassword(null)
            setToggleComp(true)
            return;
        } else {
            setIsPwTrue(false)
        }
    }

    const editConfirm = async () => {
        if (name?.length === 0) {
            alert("이름을 입력해 주세요")
            return;
        }
        if (isPwTrue === true && isPasswordMatch === true) {
            const res = await axios({
                method: "patch",
                url: `${import.meta.env.VITE_ADDRESS}/user/update`,
                data: {
                    id: userInfo.user_id,
                    user_name: name,
                    password: password

                }
            })
            console.log(res.data)
            alert("회원정보가 수정되었습니다")
            window.location.href = "/profile"
            return;
        }

        if (isPwTrue === null && isPasswordMatch === null) {
            const res = await axios({
                method: "patch",
                url: `${import.meta.env.VITE_ADDRESS}/user/update/nopw`,
                data: {
                    id: userInfo.user_id,
                    user_name: name,
                }
            })
            console.log(res.data)
            alert("회원정보가 수정되었습니다")
            window.location.href = "/profile"
            return;
        }

        else {
            alert("비밀번호를 확인해 주세요")
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


    //회원탈퇴
    const userDelete = async () => {
        if (window.confirm("회원탈퇴 하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.")) {

            const res = await axios({
                method: "delete",
                url: `${import.meta.env.VITE_ADDRESS}/user/update`,
                data: {
                    id: userInfo.user_id
                }
            })
            if (res.data.result) {
                alert("회원탈퇴 되었습니다")
                window.location.href = "/"
            } else {
                alert("회원탈퇴 오류")
            }
        }

    }


    if (toggleComp === false) {
        return (
            <div className={styles.bodys}>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div className={styles.main}>
                            <div className={styles.inputPassword}>비밀번호를 입력해 주세요</div>
                            <input className={styles.password} name="password" type="password" placeholder="Password" onChange={e => { setPw(e.target.value); }} />
                            {isPwTrue === false ? (
                                <span style={{ color: 'red', paddingRight: 120, }}>
                                    비밀번호가 틀립니다
                                </span>
                            ) : null}
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
                        <div className={styles.main2}>
                            <button type="button" onClick={userDelete} className={styles.delete}>회원탈퇴</button>
                            <div className={styles.modifyTitle}>회원정보 수정</div>
                            <div className={styles.modifyBox}>
                                <div className={styles.modifyEmail}>이메일</div>
                                <input type="text" value={userData.user.email} className={styles.email} />
                                <div className={styles.modifyName}>이름</div>
                                <input type="text" defaultValue={userData.user.user_name} maxLength={20} className={styles.password} onChange={nameCheck} placeholder="Name" />
                                <div className={styles.modifyPassword}>비밀번호</div>
                                <input
                                    className={styles.password} placeholder="Password" type="password"
                                    onChange={pwCheck} />
                                {isPwTrue === true ? (
                                    <span style={{ color: 'green', fontSize: 13, fontWeight: "bold" }}>사용가능한 비밀번호입니다.</span>
                                ) : isPwTrue === false ? (
                                    <span style={{ color: 'red', fontSize: 13, fontWeight: "bold" }}>
                                        8자 이상 / 숫자,문자,특수문자를 포함해 주세요
                                    </span>
                                ) : null}
                                <div className={styles.modifyPasswordCheck}>비밀번호 확인</div>

                                <input

                                    className={styles.password} placeholder="Confirm Password" type="password"
                                    onChange={confirmPw} />
                                {isPasswordMatch === true ? (
                                    <span style={{ color: 'green', fontSize: 13, fontWeight: "bold" }}>비밀번호 일치</span>
                                ) : isPasswordMatch === false ? (
                                    <span style={{ color: 'red', fontSize: 13, fontWeight: "bold" }}>
                                        비밀번호가 일치하지 않습니다
                                    </span>
                                ) : null}

                                <button className={styles.signinBtn} onClick={editConfirm} type="button">확인</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        )
    }
}

