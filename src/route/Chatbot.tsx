import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import styles from "../css/chatbot.module.css";
import { useAppSelector } from "../hook";

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
    tag: any;
}

function MainChatbot({ openChatbot, setOpenChatbot }: { openChatbot: boolean, setOpenChatbot: any }) {
    const userData = useAppSelector((state) => state.signin);
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
        let tags : any = "";
        const myPage = <a href="/profile">마이페이지 이동</a>
        const qna = <a href="/question">Q&A페이지로 이동</a>
        

        if (inputValue.includes("배송")) {
            answer = "배송일은 마이페이지의 주문내역란에서 확인 가능합니다."
            if(userData.user_id) {
                tags = myPage
            }
            if (inputValue.includes("배송상태")) {
                answer = "배송상태는 마이페이지의 주문내역란에서 확인 가능합니다."
                if(userData.user_id) {
                    tags = myPage
                }
            }
        } else if (inputValue.includes("주문")) {
            answer = "주문내역은 마이페이지의 주문내역란에서 확인 가능합니다."
            if(userData.user_id) {
                tags = myPage
            }
        } else if (inputValue.includes("선물포장")) {
            answer = "선물포장은 불가합니다."
        } else if (inputValue.includes("포인트")) {
            answer = "포인트 사용방법은 결제페이지 포인트란에서 사용하시면 됩니다."
            if(inputValue.includes("포인트확인")) {
                answer = "포인트 확인은 마이페이지에서 확인 가능합니다."
                if(userData.user_id) {
                    tags = myPage
                }
            }
        } else if (inputValue.includes("직접수령")) {
            answer = "방문하여 직접수령하심은 불가합니다."
        } else if (inputValue.includes("탈퇴")) {
            answer = "회원탈퇴는 마이페이지에서 가능합니다."
            if(userData.user_id) {
                tags = myPage
            }
            if(inputValue.includes("탈퇴취소")) {
                answer = "탈퇴취소는 마이페이지에서 가능합니다."
                if(userData.user_id) {
                    tags = myPage
                }
            }
        } else if (inputValue.includes("회원")) {
            answer = "회원정보는 마이페이지에서 확인 가능합니다."
            if(userData.user_id) {
                tags = myPage
            }
            if(inputValue.includes("회원정보수정")) {
                answer = "회원정보수정은 마이페이지에서 가능합니다."
                if(userData.user_id) {
                    tags = myPage
                }
            }
        } else if (inputValue.includes("비밀번호")) {
            answer = "비밀번호수정은 마이페이지에서 가능합니다."
            if(userData.user_id) {
                tags = myPage
            }
        } else if (inputValue.includes("안녕")) {
            answer = "큭큭큭 반갑다 인간이여... 난 챗봇 원노라고 한다."
        } else {
            answer = "자세한건 Q&A페이지에서 질문해주세요."
            if(userData.user_id) {
                tags = qna
            }
        }
        setChats((prevChat) => {
            return [...prevChat, { message: inputValue, type: "question", tag:null}, { message: answer, type: "answer", tag: tags }]
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
                                    {chat.tag && <div className={styles.answerLink}>{chat.tag}</div>}
                                </div>
                            )
                        }
                    })}
                </div>
                <div className={styles.chatbotChattingBox}>
                    <input className={styles.chatbotChatting} onChange={e => setInputValue(e.currentTarget.value)} value={inputValue} onKeyDown={(e) => {
                        if (e.key === "Enter") { EnterChat() }
                    }} />
                    <div className={styles.chatbotChattingBtn}><FontAwesomeIcon icon={faPaperPlane} onClick={() => { EnterChat()}} /></div>
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
            <div className={styles.chatbotIconContainer} onClick={() => { setOpenChatbot(true) }}>
                <FontAwesomeIcon icon={faMessage} className={styles.chatbotIcon} />
            </div>
    )
}