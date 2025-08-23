import React, { useMemo, useState } from 'react';
import styles from '../styles/Portfolio.module.css';
import logo from "../images/logo.png";
import ProjectModal from "../components/ProjectModal";

export default function Portfolio() {
    const initialUser = useMemo(() => ({
        name: "홍길동",
        phone: "010-1111-1111",
        address: "서울시 OO구 OO동",
        desiredJobs: ["프론트엔드", "백엔드", "풀스택"],
        techStack: ["React", "Spring", "MySQL"],
        interests: ["카카오", "네이버", "삼성"],
        projects: [
            { name: "프로젝트 A", period: "1개월", type: "웹 개발", award: "없음", description: "간단한 웹사이트 제작", techStack: ["React", "CSS"] },
            { name: "프로젝트 B", period: "2개월", type: "앱 개발", award: "없음", description: "모바일 앱 제작", techStack: ["React Native", "Node.js"] },
            { name: "프로젝트 C", period: "3개월", type: "백엔드 개발", award: "없음", description: "API 서버 제작", techStack: ["Spring", "MySQL"] }
        ],
        appliedJobs: [
            { company: "OO 기업", deadline: "마감 5일 전", type: "신입 및 경력 사원 모집" },
            { company: "OO 기업", deadline: "마감 5일 전", type: "신입 및 경력 사원 모집" },
            { company: "OO 기업", deadline: "마감 5일 전", type: "신입 및 경력 사원 모집" },
            { company: "OO 기업", deadline: "마감 5일 전", type: "신입 및 경력 사원 모집" },
            { company: "OO 기업", deadline: "마감 5일 전", type: "신입 및 경력 사원 모집" }
        ]
    }), []);

    const [desiredJobs, setDesiredJobs] = useState(initialUser.desiredJobs);
    const [techStack, setTechStack] = useState(initialUser.techStack);

    // 선택 상태 (Set 사용: 빠른 토글/존재확인)
    const [selectedDesired, setSelectedDesired] = useState(new Set());
    const [selectedTech, setSelectedTech] = useState(new Set());

    // 입력값 (새 태그 추가)
    const [desiredInput, setDesiredInput] = useState('');
    const [techInput, setTechInput] = useState('');

    const [selectedProject, setSelectedProject] = useState(null);
    const colors = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"];

    const user = {
        ...initialUser,
        desiredJobs,
        techStack,
    };

    const toggleSelection = (section, value) => {
        const updater = section === 'desired' ? setSelectedDesired : setSelectedTech;
        const current = section === 'desired' ? selectedDesired : selectedTech;
        const next = new Set(current);
        next.has(value) ? next.delete(value) : next.add(value);
        updater(next);
    };

    const addTag = (section) => {
        if (section === 'desired') {
            const name = desiredInput.trim();
            if (!name) return;
            if (!desiredJobs.includes(name)) setDesiredJobs(prev => [...prev, name]);
            setDesiredInput('');
        } else {
            const name = techInput.trim();
            if (!name) return;
            if (!techStack.includes(name)) setTechStack(prev => [...prev, name]);
            setTechInput('');
        }
    };

    const removeTag = (section, value) => {
        if (section === 'desired') {
            setDesiredJobs(prev => prev.filter(job => job !== value));
            setSelectedDesired(prev => {
                const next = new Set(prev);
                next.delete(value);
                return next;
            });
        } else {
            setTechStack(prev => prev.filter(tech => tech !== value));
            setSelectedTech(prev => {
                const next = new Set(prev);
                next.delete(value);
                return next;
            });
        }
    };


    const handleKeyDown = (e, section) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag(section);
        }
    };


    return (
        <div className={styles['profile-page']}>
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
                            {initialUser.interests.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={styles.circle}
                                    style={{ backgroundColor: colors[idx % colors.length] }}
                                    onClick={() => setDesiredJobs(item)}
                                >
                                    <span className={styles['circle-text']}>{item[0]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.projects}>
                        <h3>나의 프로젝트</h3>
                        <div className={styles['circle-list']}>
                            {initialUser.projects.map((proj, idx) => (
                                <div
                                    key={idx}
                                    className={styles.circle}
                                    style={{ backgroundColor: colors[idx % colors.length] }}
                                    onClick={() => setSelectedProject(proj)}
                                >
                                    <span className={styles['circle-text']}>{proj.name[0]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles['profile-right']}>
                    <div className={styles['desired-jobs']}>
                        <h3>희망 직무</h3>
                        <div className={styles['tag-row']}>
                            {desiredJobs.map((job) => (
                                <div key={job} className={styles['tag-wrapper']}>
                                    <span className={styles['tag']}>{job}</span>
                                    <button className={styles['tag-remove']} onClick={() => removeTag('desired', job)}>×</button>
                                </div>
                            ))}
                        </div>
                        <div className={styles['tag-input-row']}>
                            <input
                                type="text"
                                placeholder="새 직무 입력 후 Enter"
                                value={desiredInput}
                                onChange={(e) => setDesiredInput(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, 'desired')}
                                className="tag-input"
                            />
                            <button type="button" className={styles['add-btn']} onClick={() => addTag('desired')}>추가</button>
                        </div>
                    </div>

                    <div className={styles['tech-stack']}>
                        <h3>기술 스택</h3>
                        <div className={styles['tag-row']}>
                            {techStack.map((tech) => (
                                <div key={tech} className={styles['tag-wrapper']}>
                                    <span className={styles['tag']}>{tech}</span>
                                    <button className={styles['tag-remove']} onClick={() => removeTag('tech', tech)}>×</button>
                                </div>
                            ))}
                        </div>

                        <div className={styles['tag-input-row']}>
                            <input
                                type="text"
                                placeholder="새 스택 입력 후 Enter"
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, 'tech')}
                                className="tag-input"
                            />
                            <button type="button" className={styles['add-btn']} onClick={() => addTag('tech')}>추가</button>
                        </div>
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
                <div className={styles['profile-modal']}>
                    {/* 오른쪽 상세 정보 탭 */}
                    {selectedProject && (
                        <ProjectModal
                            project={selectedProject}
                            onClose={() => setSelectedProject(null)}
                            onUpdate={(updatedProject) => {
                                console.log("업데이트된 프로젝트:", updatedProject);
                                setSelectedProject(updatedProject);
                                // TODO: 추후 DB 반영
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
