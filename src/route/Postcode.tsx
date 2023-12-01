import axios from "axios";
import React,{useState} from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal"; // 추가
import { useAppSelector } from "../hook";

const Postcode: React.FC = () =>{
    const [zipCode, setZipcode] = useState<string>("");
    const [addressName, setAddressName] = useState<string>("");
    const [roadAddress, setRoadAddress] = useState<string>("");
    const [detailAddress, setDetailAddress] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const userData = useAppSelector((state) => state.signin);

    const completeHandler = (data:any) =>{
        setZipcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setIsOpen(false);
    }

    // Modal 스타일
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    const toggle = () =>{
        setIsOpen(!isOpen);
    }

    const handleAddressName = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setAddressName(e.target.value);
    }

    const handleAddressDetail = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setDetailAddress(e.target.value);
    }


    const handleAddressSave = async () =>{
        if(detailAddress===""){
            alert("상세주소를 입력해주세요!");
        }
        else{
            const res = await axios({
                method:"POST",
                url:"http://localhost:8000/buy/address/add",
                data:{
                    address:roadAddress,
                    detail:detailAddress,
                    zip_code:zipCode,
                    user_id:userData.user_id,
                    address_name:addressName,
                }
            })

            console.log(res)
            console.log(res.data.result);
            
            if(res.data.result){
                alert("저장됐습니다!");
            }
            else{
                alert("오류가 발생했습니다.")
            }
        } 
    }

    return(
        <div>
            <div>
                <input value={addressName} placeholder="이름" onChange={handleAddressName}/>
                <input value={zipCode} readOnly placeholder="우편번호" />
                <div onClick={toggle}>우편번호 검색</div>
            </div>
            <div>
                <input value={roadAddress} readOnly placeholder="도로명 주소" />
                <input type="text" onChange={handleAddressDetail} value={detailAddress} placeholder="상세주소"/>
            </div>
            <div onClick={()=>{handleAddressSave()}}>저장</div>

            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                <DaumPostcode onComplete={completeHandler} style={{height:"100%"}} />
            </Modal>
        </div>
    );
}

export default Postcode;