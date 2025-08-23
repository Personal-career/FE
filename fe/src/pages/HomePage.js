import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot";

import '../styles/HomePage.css';
import logo from '../images/logo.png';
import search from '../images/search.png';
import ai from '../images/ai.png';
import realtime from '../images/realtime.png';
import chatbot from '../images/chatbot.png';

export default function HomePage() {
    const [chatOpen, setChatOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="homepage">

            {/* 히어로 섹션 */}
            <div className="hero-container">
                <section className="hero1">
                    <div className="hero-content">
                        <h2>
                            실시간 채용 <br /> 공고 모니터링
                        </h2>
                        <p>
                            관심 기업의 채용 소식을 <br /> 매일 확인하세요.
                        </p>
                        <button className="Corporation-btn">관심 기업 등록하기</button>
                    </div>
                    <div className="hero-image">
                        <img src={realtime} alt="realtime" />
                    </div>
                </section>

                <section className="hero2">
                    <div className="hero-content">
                        <h2>
                            AI 기반 맞춤형 채용 <br /> 공고 모니터링
                        </h2>
                        <p>
                            나의 직무에 맞는 채용 소식을 <br /> 매일 받아보세요.
                        </p>
                        <button className="job-btn">나의 직무 등록하기</button>
                    </div>
                    <div className="hero-image">
                        <img src={ai} alt="ai" />
                    </div>
                </section>
            </div>

            {/* 카드 섹션 */}
            <section style={{ padding: "40px", width: "100%", margin: "0 auto" }}>
                <h3
                    style={{
                        color: "#000000",
                        fontSize: "40px",
                        textAlign: "left",
                        marginBottom: "20px"
                    }}
                >
                    오늘의 추천 채용 공고
                </h3>
                <div
                    style={{
                        display: "grid",
                        gap: "40px",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        width: "100%",
                        justifyContent: "stretch"
                    }}
                >
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <div key={idx} className="card">
                            <img src={logo} alt="company" height="100px" width="150px" />
                            <p id="d-day">D-10</p>
                            <p id="company-name">(주)OO회사</p>
                            <h4 id="job">직무 {idx + 1}</h4>
                            <p id="description">서울 · 정규직</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 챗봇 버튼 & 창 */}
            {!chatOpen && (
                <img
                    src={chatbot}
                    alt="chat"
                    onClick={() => setChatOpen(true)}
                    style={{
                        cursor: "pointer",
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        width: "60px",
                        height: "60px",
                        zIndex: 1000
                    }}
                />
            )}

            {chatOpen && <ChatBot onClose={() => setChatOpen(false)} />}
        </div>
    );
}
