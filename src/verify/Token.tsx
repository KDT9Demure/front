import axios from "axios"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hook";
import {Cookies} from 'react-cookie';
import { setGrade, setUserId, setUserName } from "../reducer/singin";

export default function Token(){

    
    const cookies = new Cookies();
    console.log(cookies.get("NID"));
    
    
    const dispatch = useAppDispatch();

    // 리덕스 사용코드
    // const userData = useAppSelector((state) => state.signin);

    useEffect(()=>{
        const signIn = async ()=>{
            const res = await axios({
                method:"POST",
                url:"http://localhost:8000/user/token",
                headers:{
                    Authorization: `Bearer ${cookies.get("NID")}`
                }
            })

            dispatch(setUserId(res.data.id));
            dispatch(setUserName(res.data.user_name));
            dispatch(setGrade(res.data.grade));
        }

        if(!cookies.get("NID")){
            dispatch(setUserId(0));
            dispatch(setUserName(""));
            dispatch(setGrade("N"));
        }
        
        signIn()
    },[])

    return(
        <>

        </>
    )
}