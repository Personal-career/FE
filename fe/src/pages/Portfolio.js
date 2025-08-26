import React, { useMemo, useState, useEffect } from 'react'; // useEffect 추가
import axios from 'axios';
import styles from '../styles/Portfolio.module.css';
import logo from "../images/logo.png";
import ProjectModal from "../components/ProjectModal";
import EmploymentModal from "../components/Employment";
import defaultLogo from "../images/logo.png";

export default function Portfolio() {
    const initialUser = useMemo(() => ({
        name: "홍길동",
        phone: "010-1111-1111",
        address: "서울시 OO구 OO동",
        desiredJobs: ["프론트엔드", "백엔드", "풀스택"],
        techStack: ["React", "Spring", "MySQL"],
        interests: ["카카오", "네이버", "삼성"],
        appliedJobs: [
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
        ]
    }), []);

    const [user, setUser] = useState(initialUser);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...initialUser });

    const [desiredJobs, setDesiredJobs] = useState(initialUser.desiredJobs);
    const [techStack, setTechStack] = useState(initialUser.techStack);

    // 선택 상태 (Set 사용: 빠른 토글/존재확인)
    const [selectedDesired, setSelectedDesired] = useState(new Set());
    const [selectedTech, setSelectedTech] = useState(new Set());
    const [selectedJob, setSelectedJob] = useState(null);

    // 입력값 (새 태그 추가)
    const [desiredInput, setDesiredInput] = useState('');
    const [techInput, setTechInput] = useState('');

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:8080/portfolio");
                const projects = response.data.map(p => ({
                    ...p,
                    techStack: Array.isArray(p.techStack) ? p.techStack : []
                }));
                setProjects(projects);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);


    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류 발생: {error.message}</div>;

    const colors = [
        "#A7C7E7", // 파스텔 블루
        "#B5EAD7", // 파스텔 민트
        "#C7CEEA", // 파스텔 퍼플
        "#FFDAC1", // 파스텔 오렌지
        "#FFB7B2", // 파스텔 핑크
        "#E2F0CB", // 파스텔 그린
    ];

    const getColorForItem = (item) => {
        let hash = 0;
        for (let i = 0; i < item.length; i++) {
            hash = item.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };
/*
    const user = {
        ...initialUser,
        desiredJobs,
        techStack,
    };
*/
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
    const handleChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setUser(editData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData(user);
        setIsEditing(false);
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
                            <h3>
                                기본 정보
                                {!isEditing && (
                                    <button
                                        className={styles['edit-btn']}
                                        onClick={() => setIsEditing(true)}
                                    >
                                        ✏️
                                    </button>
                                )}
                            </h3>
                            {isEditing ? (
                                <div className={styles['edit-form']}>
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={editData.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={editData.address}
                                        onChange={(e) => handleChange("address", e.target.value)}
                                    />

                                    <div className={styles['edit-actions']}>
                                        <button onClick={handleSave} className={styles['save-btn']}>
                                            ✔️ 완료
                                        </button>
                                        <button onClick={handleCancel} className={styles['cancel-btn']}>
                                            ❌ 취소
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p>{user.name}</p>
                                    <p>{user.phone}</p>
                                    <p>{user.address}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles['interests']}>
                        <h3>관심 기업</h3>
                        <div className={styles['circle-list']}>
                            {initialUser.interests.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={styles.circle}
                                    style={{ backgroundColor: getColorForItem(item)}}
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
                            {projects.map((proj, idx) => (
                                <div
                                    key={proj.id ? proj.id : idx}
                                    className={styles.circle}
                                    style={{ backgroundColor: getColorForItem(proj.name || `project-${idx}`) }}
                                    onClick={() => setSelectedProject(proj)}
                                >
                                    <span className={styles['circle-text']}>{proj.name ? proj.name[0] : '?'}</span>
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
                                <div key={`${job.empSeqno}-${idx}`} className={styles['job-card']} onClick={() => setSelectedJob(job)}>
                                    <img
                                        src={job.regLogImgNm || defaultLogo}
                                        alt="company"
                                        height="100px"
                                        width="150px"
                                    />
                                    <p id={styles['d-day']}>D-10</p>
                                    <p id="company-name">{job.empBusiNm}</p>
                                    <h4 id="job">{job.empWantedTitle}</h4>
                                    <p id="description">
                                        {job.location} · {job.empWantedTypeNm}
                                    </p>
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
                    {selectedJob && (
                        <EmploymentModal
                            job={selectedJob}
                            onClose={() => setSelectedJob(null)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
