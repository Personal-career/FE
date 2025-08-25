import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot";
import EmploymentModal from "../components/Employment"; // 모달 import
import '../styles/HomePage.css';
import ai from '../images/ai.png';
import realtime from '../images/realtime.png';
import chatbot from '../images/chatbot.png';
import defaultLogo from "../images/logo.png";

export default function HomePage() {
    const [chatOpen, setChatOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const navigate = useNavigate();

    //더미데이터
    const jobs = [
        {
            empSeqno: "123456",
            empWantedTitle: "프론트엔드 개발자",
            empBusiNm: "신세계푸드",
            empWantedTypeNm: "정규직",
            empWantedStdt: "2025-08-20",
            empWantedEndt: "2025-09-10",
            empWantedHomepgDetail: "https://job.example.com/123456",
            regLogImgNm: defaultLogo,
            location: "서울"
        },
        {
            empSeqno: "654321",
            empWantedTitle: "백엔드 개발자",
            empBusiNm: "OO회사",
            empWantedTypeNm: "계약직",
            empWantedStdt: "2025-08-22",
            empWantedEndt: "2025-09-15",
            empWantedHomepgDetail: "https://job.example.com/654321",
            regLogImgNm: defaultLogo,
            location: "부산"
        }
    ];

    // → 카드 클릭 시 모달 열기
    const handleCardClick = (job) => {
        setSelectedJob(job);
    };

    // → 모달 닫기
    const handleCloseModal = () => {
        setSelectedJob(null);
    };

    return (
        <div className="homepage">

            {/* 히어로 섹션 */}
            <div className="hero-container">
                <section className="hero1">
                    <div className="hero-content">
                        <h2>
                            실시간 채용 <br/> 공고 모니터링
                        </h2>
                        <p>
                            관심 기업의 채용 소식을 <br/> 매일 확인하세요.
                        </p>
                        <button className="Corporation-btn">관심 기업 등록하기</button>
                    </div>
                    <div className="hero-image">
                        <img src={realtime} alt="realtime"/>
                    </div>
                </section>

                <section className="hero2">
                    <div className="hero-content">
                        <h2>
                            AI 기반 맞춤형 채용 <br/> 공고 모니터링
                        </h2>
                        <p>
                            나의 직무에 맞는 채용 소식을 <br/> 매일 받아보세요.
                        </p>
                        <button className="job-btn">나의 직무 등록하기</button>
                    </div>
                    <div className="hero-image">
                        <img src={ai} alt="ai"/>
                    </div>
                </section>
            </div>

            {/* 카드 섹션 */}
            <section className="card-section">
                <h3>오늘의 추천 채용 공고</h3>
                <div style={{display: "grid", gap: "40px"}}>
                    {jobs.map((job) => (
                        <div
                            key={job.empSeqno}
                            className="card"
                            style={{cursor: "pointer"}}
                            onClick={() => handleCardClick(job)} // → 여기만 추가
                        >
                            <img
                                src={job.regLogImgNm || defaultLogo}
                                alt="company"
                                height="100px"
                                width="150px"
                            />
                            <p id="d-day">D-10</p>
                            <p id="company-name">{job.empBusiNm}</p>
                            <h4 id="job">{job.empWantedTitle}</h4>
                            <p id="description">
                                {job.location} · {job.empWantedTypeNm}
                            </p>
                        </div>
                    ))}
                </div>

                {/* → 모달 */}
                {selectedJob && (
                    <EmploymentModal job={selectedJob} onClose={handleCloseModal} />
                )}
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
