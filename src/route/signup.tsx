import React, { FC, useRef } from "react"

import { useForm, SubmitHandler } from "react-hook-form"

import styles from "../css/signup.module.css";

interface FormValue {
    id: string
    password: string
    confirmPassword: string
    name: string
    email: string
    emailNumber: number
}
// const signupForm: FC = () => {

//     return(
//         <>

//         </>
//     )
// }

export default function Signup() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValue>({})
    console.log(watch("id"));

    const onVaild = (data: any) => {
        console.log(data)
    };

    {/* 비밀번호 / 비밀번호 확인 일치를 검증하기 위해 password input 의 value 를 추적함*/ }
    const passwordRef = useRef<string | null>(null)
    passwordRef.current = watch("password")

    //이메일 인증번호 전송 온클릭
    const emailCheck = () => {
        console.log("인증번호 전송")
    }
    //인증번호 확인 온클릭
    const authorConfirm = () => {
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
                <br />
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
                <br />
                <div>
                    <span>{errors?.password?.message}</span>
                </div>

                <input
                    {...register("confirmPassword", {
                        required: "비밀번호를 한번 더 입력해주세요",
                        validate: { value: (value) => value === passwordRef.current || "비밀번호가 일치하지 않습니다" }
                    })}
                    className={styles.confirmPassword} placeholder="Confirm Password" type="password" />
                <br />
                <div>
                    <span>{errors?.confirmPassword?.message}</span>
                </div>

                <input
                    {...register("name", {
                        required: "이름을 입력해주세요"
                    })}
                    className={styles.name} placeholder="Name" />
                <br />
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
                <br />
                <div>
                    <span>{errors?.email?.message}</span>
                </div>

                <button className={styles.emailBtn} type="button" onClick={emailCheck} >이메일 인증</button>
                <br />
                <div className={styles.emailDiv}>


                    <input
                        {...register("emailNumber", {
                            required: "인증번호를 확인해주세요"
                        })}
                        className={styles.emailNumber} placeholder="Author Number" maxLength={10} />

                    <button className={styles.emailNumberConfirmBtn} type="button" onClick={authorConfirm}>확인</button>
                </div>
                <br />
                <div>
                    <span>{errors?.emailNumber?.message}</span>
                </div>

                <button className={styles.signupBtn}>회원가입</button>

            </form>
        </div>

    )
}


