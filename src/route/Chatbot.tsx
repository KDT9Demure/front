import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/chatbot.module.css";





export default function Chatbot() {
    const [openChatbot, setOpenChatbot] = useState<boolean>(false);

    return ( 
            <div className={styles.chatbotIconContainer}>
                <FontAwesomeIcon icon={faPersonCircleQuestion} className={styles.chatbotIcon} onClick={() => {setOpenChatbot(true)}}/>
            </div>
    )
}