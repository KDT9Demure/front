import { useEffect } from "react";
import axios from "axios";

export default function Kakao() {

    

    useEffect(()=>{
        const kakao_code = async ()=>{
            const code = new URL(window.location.href).searchParams.get("code");
            console.log(code)
           const res = await axios({
                method:"POST",
                url:"http://localhost:8000/user/kakao/code",
                data:{
                    code
                }
            })
            console.log(res)
        }


        kakao_code();
        

    }, [])

    return(
        <>

        </>   
    )

}
