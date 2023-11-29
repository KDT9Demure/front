import { useEffect } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default function Kakao() {

    

    useEffect(()=>{
        const kakao_code = async ()=>{
            const code = new URL(window.location.href).searchParams.get("code");
            console.log(code)
           const token = await axios({
                method:"POST",
                url:"http://localhost:8000/user/kakao/code",
                data:{
                    code
                }
            })

            //쿠키에 value로 token 넣기
            const cookie = new Cookies();
            cookie.set("NID", token);
        }
        kakao_code();

    }, [])

    return(
        <>

        </>   
    )

}
