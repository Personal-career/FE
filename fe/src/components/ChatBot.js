import { useState, useRef, useEffect } from "react";

export default function ChatBot({ onClose }) {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "안녕하세요! Career ChatBot입니다 😊 무엇을 도와드릴까요?" }
    ]);
    const [input, setInput] = useState("");
    const [isComposing, setIsComposing] = useState(false); // 한글 조합 상태 추적
    const timeoutRef = useRef(null); // 봇 메시지 중복 방지
    const isSendingRef = useRef(false); // 사용자 메시지 중복 방지
    const messagesEndRef = useRef(null); // 스크롤 자동 이동

    const getBotReply = (msg) => {
        if (msg.includes("채용")) return "오늘의 추천 채용 공고는 메인 화면 카드에서 확인하세요!";
        if (msg.includes("지원")) return "지원 방법은 각 공고 페이지에서 확인 가능합니다 📝";
        return "죄송해요 😅 아직 학습 중이에요.";
    };

    const sendMessage = () => {
        if (!input.trim() || isSendingRef.current) return; // 이미 전송 중이면 무시

        isSendingRef.current = true;
        const userMsg = input;
        setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
        setInput(""); // 전송 후 입력창 초기화

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setMessages((prev) => [...prev, { sender: "bot", text: getBotReply(userMsg) }]);
            timeoutRef.current = null;
            isSendingRef.current = false;
        }, 500);
    };

    // 메시지 추가 시 자동 스크롤
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000
        }}>
            <div style={{
                padding: "10px",
                background: "#1E3A5F",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <span>🤖 ChatBot</span>
                <button onClick={onClose} style={{background: "none", border: "none", color: "#fff", cursor: "pointer"}}>X</button>
            </div>

            <div style={{flex: 1, padding: "10px", overflowY: "auto"}}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{textAlign: msg.sender === "user" ? "right" : "left"}}>
                        <span style={{
                            display: "inline-block",
                            padding: "6px 10px",
                            borderRadius: "12px",
                            margin: "4px 0",
                            background: msg.sender === "user" ? "#BEDDFF" : "#E5E5E5"
                        }}>
                            {msg.text}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div style={{display: "flex", borderTop: "1px solid #ccc"}}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onCompositionStart={() => setIsComposing(true)}  // 한글 조합 시작
                    onCompositionEnd={() => setIsComposing(false)}   // 한글 조합 종료
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !isComposing) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                    placeholder="메시지를 입력하세요..."
                    style={{flex: 1, border: "none", padding: "10px", outline: "none"}}
                />
                <button
                    onClick={sendMessage}
                    style={{padding: "10px 14px", border: "none", background: "#1E3A5F", color: "#fff", cursor: "pointer"}}
                >
                    전송
                </button>
            </div>
        </div>
    );
}
