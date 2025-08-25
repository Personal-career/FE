import React, { useState } from "react";
import defaultLogo from "../images/logo.png";
import "../styles/EmploymentPage.css";

const EmploymentModal = ({ job, onClose }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    if (!job) return null;

    const toggleFavorite = () => {
        setIsFavorite(prev => !prev);
        // 실제 API 연동 가능
    };

    return (
        <div className="employment-modal-overlay">
            <div className="employment-modal">
                <button className="employment-close" onClick={onClose}>✕</button>

                {/* 상단 로고 + title/회사명 + 하트 */}
                <div className="employment-header">
                    <img
                        src={job.regLogImgNm || defaultLogo}
                        alt={`${job.empBusiNm} 로고`}
                        className="employment-logo"
                    />

                    <div className="employment-header-text">
                        <h2 className="employment-title">{job.empWantedTitle}</h2>
                        <div className="company-favorite">
                            <p className="employment-company">{job.empBusiNm}</p>
                            <button className="favorite-btn" onClick={toggleFavorite}>
                                {isFavorite ? "💙" : "🤍"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 하단 중앙 정보 */}
                <div className="employment-body">
                    <p className="employment-info">
                        <span>모집기간:</span> {job.empWantedStdt} ~ {job.empWantedEndt}
                    </p>
                    <p className="employment-info">
                        <span>고용형태:</span> {job.empWantedTypeNm}
                    </p>
                    <a
                        href={job.empWantedHomepgDetail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="employment-button"
                    >
                        지원하기
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EmploymentModal;
