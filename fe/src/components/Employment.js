import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultLogo from "../images/logo.png";
import "../styles/EmploymentPage.css";

const EmploymentModal = ({ job, onClose, onFavoriteUpdate }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // job이 바뀔 때마다 관심기업 체크
    useEffect(() => {
        if (!job || !job.id) return; // id 없으면 체크 안 함
        axios.get("http://localhost:8080/api/jobs/favorite")
            .then(res => {
                const exists = res.data.some(fav => fav.jobId === job.id);
                setIsFavorite(exists);
            })
            .catch(err => console.error("관심기업 체크 실패:", err));
    }, [job]);

    if (!job) return null;

    const toggleFavorite = () => {
        if (isFavorite) {
            axios.delete(`http://localhost:8080/api/jobs/favorite/${job.id}`)
                .then(() => {
                    setIsFavorite(false);
                    onFavoriteUpdate && onFavoriteUpdate(job.id, false);
                })
                .catch(err => console.error("관심기업 삭제 실패:", err));
        } else {
            axios.post("http://localhost:8080/api/jobs/favorite", {
                jobId: job.empSeqno,                   // 여기 DB PK
                companyName: job.empBusiNm,
                companyLogo: job.regLogImgNm || defaultLogo,
                applyLink: job.empWantedHomepgDetail
            })
                .then(() => {
                    setIsFavorite(true);
                    onFavoriteUpdate && onFavoriteUpdate(job.id, true);
                })
                .catch(err => console.error("관심기업 등록 실패:", err));
        }
    };


    return (
        <div className="employment-modal-overlay">
            <div className="employment-modal">
                <button className="employment-close" onClick={onClose}>✕</button>

                <div className="employment-header">
                    <img
                        src={job.regLogImgNm || defaultLogo}
                        alt={`${job.empBusiNm} 로고`}
                        className="employment-logo"
                    />
                    <div className="employment-header-text">
                        <h2 className="employment-title">{job.empBusiNm}</h2>
                        <button className="favorite-btn" onClick={toggleFavorite}>
                            {isFavorite ? "💙" : "🤍"}
                        </button>
                        <div className="company-favorite">
                            <p className="employment-company">{job.empWantedTitle}</p>
                        </div>
                    </div>
                </div>

                <div className="employment-body">
                    <p className="employment-info">
                        <span>모집기간:</span> {job.empWantedStdt} ~ {job.empWantedEndt}
                    </p>
                    <p className="employment-info">
                        <span>고용형태:</span> {job.empWantedTypeNm}
                    </p>
                    <p className="employment-info">
                        <span>위치:</span> {job.location}
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
