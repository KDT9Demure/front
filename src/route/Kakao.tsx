import { useEffect } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default function Kakao() {



    useEffect(() => {
        const kakao_code = async () => {
            const code = new URL(window.location.href).searchParams.get("code");
            const token = await axios({
                method: "POST",
                url:`${import.meta.env.VITE_ADDRESS}/user/kakao/code`,
                data: {
                    code
                }
            })
            console.log("token",token)
            //쿠키에 value로 token 넣기
            const cookie = new Cookies();
            cookie.set("DEMURE", token);
            window.location.href = '/';
        }
        kakao_code();

    }, [])

    return (
        <>

        </>
    )

}
