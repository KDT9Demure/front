import axios from "axios"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hook";
import {Cookies} from 'react-cookie';
import { setGrade, setUserId, setUserName, setUserid } from "../reducer/singin";

export default function Token(){

    
    const cookies = new Cookies();
    console.log(cookies.get("DEMURE"));
    
    
    const dispatch = useAppDispatch();

    // 리덕스 사용코드
    // const userData = useAppSelector((state) => state.signin);

    useEffect(()=>{
        const signIn = async ()=>{
            const res = await axios({
                method:"POST",
                url:`${import.meta.env.VITE_ADDRESS}/user/token`,
                headers:{
                    Authorization: `Bearer ${cookies.get("DEMURE")}`
                }
            })

            dispatch(setUserId(res.data.id));
            dispatch(setUserName(res.data.user_name));
            dispatch(setGrade(res.data.grade));
            dispatch(setUserid(res.data.userid));
        }

        if(!cookies.get("DEMURE")){
            dispatch(setUserId(0));
            dispatch(setUserName(""));
            dispatch(setGrade("N"));
            dispatch(setUserid(""));
        }
        
        signIn()
    },[])

    return(
        <>

        </>
    )
}