import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import styles from "../css/chatbot.module.css";


function ChatbotTalk() {

    return(
        <div>
            <div>
                <div className={styles.talkFirst}>안녕하세요! 고객지원 도우미 챗봇 원노 🤖입니다.</div>
            </div>
            <div>
                <div className={styles.talkFirst}>간단한 단어를 활용해 한 문장으로 문의해 주세요.</div>
            </div>
            <div>
                <div className={styles.talkFirst}>무엇을 도와드릴까요?</div>
            </div>
        </div>
    )
}


function MainChatbot({openChatbot, setOpenChatbot}:{openChatbot:boolean, setOpenChatbot:any}) {

    return (
        <section className={styles.chatbotSection}>
            <div className={styles.chatbotContainer}>
                <div className={styles.chatbotHeader}>
                    <div className={styles.chatbotTitleBox}>
                        <div className={styles.chatbotTitle}><FontAwesomeIcon icon={faComment} /></div>
                        <div>Demure 챗봇</div>
                    </div>
                    <div className={styles.chatbotHeaderBtnBox}>
                        <div className={styles.chatbotDownBtn}><FontAwesomeIcon icon={faChevronDown} onClick={() => {setOpenChatbot(false)}}/></div>
                        <div className={styles.chatbotCloseBtn}><FontAwesomeIcon icon={faXmark} /></div>
                    </div>
                </div>
                <div className={styles.chatbotBody}>
                    <ChatbotTalk/>
                </div>
                <div className={styles.chatbotChattingBox}>
                    <textarea className={styles.chatbotChatting}></textarea>
                    <div className={styles.chatbotChattingBtn}><FontAwesomeIcon icon={faMessage} /></div>
                </div>
            </div>
        </section>
    )
}


export default function Chatbot() {
    const [openChatbot, setOpenChatbot] = useState<boolean>(false);

    return (
        openChatbot ? 
            <MainChatbot openChatbot={openChatbot} setOpenChatbot={setOpenChatbot}/> :
            <div className={styles.chatbotIconContainer}>
                <FontAwesomeIcon icon={faMessage} className={styles.chatbotIcon} onClick={() => {setOpenChatbot(true)}}/>
            </div>
    )
}