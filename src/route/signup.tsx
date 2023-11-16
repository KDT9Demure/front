import React, { FC, useRef, useState } from "react"

import axios from "axios";

import { useForm, SubmitHandler } from "react-hook-form"

import styles from "../css/signup.module.css";

interface FormValue {
    id: string
    password: string
    confirmPassword: string
    name: string
    email: string
    emailNumber: string
}
// const signupForm: FC = () => {

//     return(
//         <>

//         </>
//     )
// }

export default function Signup() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValue>({})

    //DOM접근할수 있는 방법 찾기
    const [isDataTrue, setIsDataTrue] = useState<boolean | null>(null);

    const onVaild = async (data: any) => {
        const info = {
            userid: data.id,
            email: data.email,
            user_name: data.name,
            password: data.password
        }
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

    };

    //아이디값 빼오기
    const idValue = useRef<string | null>(null)
    idValue.current = watch("id")

    {/* 비밀번호 / 비밀번호 확인 일치를 검증하기 위해 password input 의 value 를 추적함*/ }
    const passwordRef = useRef<string | null>(null)
    passwordRef.current = watch("password")

    // 이메일 인풋 값 빼오기
    const emailAuthor = useRef<string | null>(null)
    emailAuthor.current = watch("email")

    // 인증번호 인풋 값 빼오기
    const emailNumber = useRef<string | null>(null)
    emailNumber.current = watch("emailNumber")

    //아이디 중복체크 온클릭
    const idCheck = async () => {
        const data = { userid: idValue.current }
        const res = await axios({
            method: "post",
            url: "http://localhost:8000/user/duplicate",
            data
        })
        console.log(res.data)
        if (res.data.result === true) {
            setIsDataTrue(true);
        } else {
            setIsDataTrue(false);
        }

    }

    //이메일 인증번호 전송 온클릭
    const emailCheck = async () => {
        const data = emailAuthor.current
        const res = await axios({
            method: "post",
            url: "http://localhost:8000/user/email",
            data
        })
        console.log(data)

    }
    //인증번호 확인 온클릭
    const authorConfirm = async () => {
        // const res = await axios({
        //     method: "post",
        //     url: "http://localhost:8000/user/email",
        //     data
        // })
        console.log("인증번호 확인")
    }


    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onVaild)} className={styles.form}>


                <input
                    {...register("id", {
                        required: "아이디를 입력해주세요",
                        maxLength: { message: "최대 20자를 넘을 수 없습니다", value: 20 }
                    })}
                    className={styles.id} placeholder="ID" />
                <button type="button" onClick={idCheck}>중복체크</button>
                <div>

                    {isDataTrue === true && <p>⭕</p>}
                    {isDataTrue === false && <p>❌</p>}
                    {/* {isDataTrue === null && <p>null</p>} */}
                </div>
                <div>
                    <span>{errors?.id?.message}</span>
                </div>

                <input
                    {...register("password", {
                        required: "비밀번호를 입력해주세요",
                        minLength: { message: "최소 6자, 최대 30자 까지 가능합니다", value: 6 },
                        maxLength: { message: "최소 6자, 최대 30자 까지 가능합니다", value: 30 },
                    })}
                    className={styles.password} placeholder="Password" type="password" />

                <div>
                    <span>{errors?.password?.message}</span>
                </div>

                <input
                    {...register("confirmPassword", {
                        required: "비밀번호를 한번 더 입력해주세요",
                        validate: { value: (value) => value === passwordRef.current || "비밀번호가 일치하지 않습니다" }
                    })}
                    className={styles.confirmPassword} placeholder="Confirm Password" type="password" />

                <div>
                    <span>{errors?.confirmPassword?.message}</span>
                </div>

                <input
                    {...register("name", {
                        required: "이름을 입력해주세요"
                    })}
                    className={styles.name} placeholder="Name" />

                <div>
                    <span>{errors?.name?.message}</span>
                </div>

                <input
                    {...register("email", {
                        required: "이메일을 입력해주세요",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "이메일 형식을 확인해 주세요"
                        }
                    })}
                    className={styles.email} placeholder="Email" type="text" />

                <div>
                    <span>{errors?.email?.message}</span>
                </div>

                <button className={styles.emailBtn} type="button" onClick={emailCheck} >이메일 인증</button>

                <div className={styles.emailDiv}>


                    <input
                        {...register("emailNumber", {
                            required: "인증번호를 확인해주세요"
                        })}
                        className={styles.emailNumber} placeholder="Author Number" maxLength={10} />

                    <button className={styles.emailNumberConfirmBtn} type="button" onClick={authorConfirm}>확인</button>
                </div>

                <div>
                    <span>{errors?.emailNumber?.message}</span>
                </div>

                <button className={styles.signupBtn}>회원가입</button>

            </form>
        </div >

    )
}


