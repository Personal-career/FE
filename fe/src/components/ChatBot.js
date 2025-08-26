import { useState, useRef, useEffect } from "react";
import styles from "../styles/components/ChatBot.module.css";

export default function ChatBot({ onClose }) {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "안녕하세요! Career ChatBot입니다 😊 무엇을 도와드릴까요?" }
    ]);
    const [input, setInput] = useState("");
    const [isComposing, setIsComposing] = useState(false);
    const timeoutRef = useRef(null);
    const isSendingRef = useRef(false);
    const messagesEndRef = useRef(null);

    const getBotReply = (msg) => {
        if (msg.includes("채용")) return "오늘의 추천 채용 공고는 메인 화면 카드에서 확인하세요!";
        if (msg.includes("지원")) return "지원 방법은 각 공고 페이지에서 확인 가능합니다 📝";
        return "죄송해요 😅 아직 학습 중이에요.";
    };

    const sendMessage = () => {
        if (!input.trim() || isSendingRef.current) return;

        isSendingRef.current = true;
        const userMsg = input;
        setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
        setInput("");

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setMessages((prev) => [...prev, { sender: "bot", text: getBotReply(userMsg) }]);
            timeoutRef.current = null;
            isSendingRef.current = false;
        }, 500);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className={styles["chatbot-overlay"]} onClick={onClose}>
            <div
                className={styles["chatbot-container"]}
                onClick={(e) => e.stopPropagation()}  // 모달 안 클릭 시 닫히지 않도록
            >
                <div className={styles["chatbot-header"]}>
                    <span>🤖 ChatBot</span>
                    <button onClick={onClose}>X</button>
                </div>

                <div className={styles["chatbot-messages"]}>
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`${styles["chatbot-message"]} ${styles[msg.sender]}`}
                        >
                            <span>{msg.text}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles["chatbot-input"]}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isComposing) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        placeholder="메시지를 입력하세요..."
                    />
                    <button onClick={sendMessage}>전송</button>
                </div>
            </div>
        </div>
    );
}
