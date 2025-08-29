import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";   // ✅ API 호출용
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
    const [currentPage, setCurrentPage] = useState(1);
    const [jobs, setJobs] = useState([]);
    const jobsPerPage = 4;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/jobs")
            .then(res => {
                setJobs(res.data);
            })
            .catch(err => {
                console.error("🚨 채용공고 불러오기 실패:", err);
            });
    }, []);

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    // 카드 클릭 시 모달 열기
    const handleCardClick = (job) => {
        setSelectedJob(job);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setSelectedJob(null);
    };

    const getDDay = (endDate) => {
        if (!endDate) return "";
        const today = new Date();
        const end = new Date(endDate);
        const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        return diff >= 0 ? `D-${diff}` : "마감";
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
                <div className="card-grid">
                    {currentJobs.map((job) => (
                        <div key={job.empSeqno} className="card" onClick={() => handleCardClick(job)}>
                            <img
                                src={job.regLogImgNm || defaultLogo}
                                alt="company"
                                height="100px"
                                width="150px"
                            />
                            <p id="d-day">{getDDay(job.empWantedEndt)}</p>
                            <p id="company-name">{job.empBusiNm}</p>
                            <h4 id="job">{job.empWantedTitle}</h4>
                            <p id="description">
                                {job.location} · {job.empWantedTypeNm}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        이전
                    </button>
                    <span>{currentPage} / {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        다음
                    </button>
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
