import React from 'react';
import styles from '../styles/Portfolio.module.css';

export default function Portfolio() {
    const user = {
        name: "홍길동",
        phone: "010-1111-1111",
        address: "서울시 OO구 OO동",
        desiredJobs: ["프론트엔드", "백엔드", "풀스택"],
        techStack: ["React", "Spring", "MySQL"],
        interests: ["카카오", "네이버", "삼성"],
        projects: ["프로젝트 A", "프로젝트 B", "프로젝트 C"],
        appliedJobs: [
            { company: "OO 기업", deadline: "마감 5일 전", type: "신입 및 경력 사원 모집" },
            { company: "OO 기업", deadline: "마감 5일 전", type: "신입 및 경력 사원 모집" },
        ]
    };

    return (
        <div className={styles['profile-page']}>
            <header className={styles.header}>
                <h1>로고</h1>
                <input type="text" placeholder="검색" className={styles['search-bar']}/>
                <span className={styles.logout}>로그아웃</span>
            </header>

            <div className={styles['profile-container']}>
                <div className={styles['profile-left']}>
                    <div className={styles['profile-image-info']}>
                        <div className={styles['profile-image']}></div>

                        <div className={styles['basic-info']}>
                            <h3>기본 정보</h3>
                            <p>{user.name}</p>
                            <p>{user.phone}</p>
                            <p>{user.address}</p>
                        </div>
                    </div>
                    <div className={styles['interests']}>
                        <h3>관심 기업</h3>
                        <div className={styles['circle-list']}>
                            {user.interests.map((item, idx) => <div key={idx} className={styles.circle}></div>)}
                        </div>
                    </div>

                    <div className={styles.projects}>
                        <h3>나의 프로젝트</h3>
                        <div className={styles['circle-list']}>
                            {user.projects.map((item, idx) => <div key={idx} className={styles.circle}></div>)}
                        </div>
                    </div>
                </div>

                <div className={styles['profile-right']}>
                    <div className={styles['desired-jobs']}>
                        <h3>희망 직무</h3>
                        {user.desiredJobs.map((job, idx) => <span key={idx} className={styles.tag}>{job}</span>)}
                    </div>

                    <div className={styles['tech-stack']}>
                        <h3>기술 스택</h3>
                        {user.techStack.map((tech, idx) => <span key={idx} className={styles.tag}>{tech}</span>)}
                    </div>

                    <div className={styles['applied-jobs']}>
                        <h3>지원한 공고</h3>
                        <div className={styles['job-cards']}>
                            {user.appliedJobs.map((job, idx) => (
                                <div key={idx} className={styles['job-card']}>
                                    <p>{job.deadline}</p>
                                    <div className={styles.circle}></div>
                                    <h4>{job.company}</h4>
                                    <p>{job.type}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
