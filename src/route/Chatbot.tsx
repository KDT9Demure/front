import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import styles from "../css/chatbot.module.css";


function ChatbotTalk() {

    return (
        <div className={styles.firstTalkContainer}>
            <div className={styles.firstTalkHead}>
                <div>챗봇이 연결되었습니다</div>
            </div>
            <div className={styles.firstTalkWrapper}>
                <div className={styles.talkFirst}>안녕하세요! 고객지원 도우미 챗봇 원노 🤖입니다.</div>
            </div>
            <div className={styles.firstTalkWrapper}>
                <div className={styles.talkSecond}>간단한 단어를 활용해 한 문장으로 문의해 주세요.</div>
            </div>
            <div className={styles.firstTalkWrapper}>
                <div className={styles.talkThird}>무엇을 도와드릴까요?</div>
            </div>
        </div>
    )
}

interface Chat {
    message: string;
    type: "question" | "answer";
}

function MainChatbot({ openChatbot, setOpenChatbot }: { openChatbot: boolean, setOpenChatbot: any }) {

    const [chats, setChats] = useState<Chat[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    //챗봇 스크롤 아래로
    const chatRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        scrollToBottom();
    }, [inputValue]);
      
 
    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };
      
    function EnterChat() { 
        let answer = "";
        if (inputValue.includes("배송")) {
            answer = "배송관련 머시기"
        } else if (inputValue.includes("주문")) {
            answer = "주문관련 머시기"
        } else if (inputValue.includes("포인트")) {
            answer = "포인트관련 머시기"
        } else if (inputValue.includes("이원노")) {
            answer = "좀 씻어라"
        } else {
            answer = "올바르게 입력해주세요"
        }
        setChats((prevChat) => {
            return [...prevChat, { message: inputValue, type: "question" }, { message: answer, type: "answer" }]
        })
        setInputValue("");
    }
    
    return (
        <section className={styles.chatbotSection}>
            <div className={styles.chatbotContainer}>
                <div className={styles.chatbotHeader}>
                    <div className={styles.chatbotTitleBox}>
                        <div className={styles.chatbotTitle}><FontAwesomeIcon icon={faComment} /></div>
                        <div>Demure 챗봇</div>
                    </div>
                    <div className={styles.chatbotHeaderBtnBox}>
                        <div className={styles.chatbotCloseBtn}><FontAwesomeIcon icon={faXmark} onClick={() => { setOpenChatbot(false) }}/></div>
                    </div>
                </div>
                <div className={styles.chatbotBody} ref={chatRef}>
                    <ChatbotTalk />
                    {chats.map((chat, index) => {
                        if (chat.type === "question") {
                            return (
                                <div className={styles.questionBox} key={index}>
                                    <div className={styles.question}>{chat.message}</div>
                                </div>
                            )
                        } else if (chat.type === "answer") {
                            return (
                                <div className={styles.answerBox} key={index}>
                                    <div className={styles.answer}>{chat.message}</div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className={styles.chatbotChattingBox}>
                    <input className={styles.chatbotChatting} onChange={e => setInputValue(e.currentTarget.value)} value={inputValue} onKeyDown={(e) => {
                        if (e.key === "Enter") { EnterChat() }
                    }} />
                    <div className={styles.chatbotChattingBtn}><FontAwesomeIcon icon={faMessage} onClick={() => { EnterChat()}} /></div>
                </div>
            </div>
        </section>
    )
}


export default function Chatbot() {
    const [openChatbot, setOpenChatbot] = useState<boolean>(false);

    return (
        openChatbot ?
            <MainChatbot openChatbot={openChatbot} setOpenChatbot={setOpenChatbot} /> :
            <div className={styles.chatbotIconContainer}>
                <FontAwesomeIcon icon={faMessage} className={styles.chatbotIcon} onClick={() => { setOpenChatbot(true) }} />
            </div>
    )
}