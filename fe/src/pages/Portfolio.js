import React, { useMemo, useState, useRef, useEffect } from 'react';
import axios from "axios";
import styles from '../styles/Portfolio.module.css';
import ProjectModal from "../components/ProjectModal";
import Spinner from "../components/Spinner";
import EmploymentModal from "../components/Employment";
import ProjectBoard from "../components/ProjectBoard";
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

    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [user, setUser] = useState(null); // 초기값 null
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    const [desiredJobs, setDesiredJobs] = useState([]);
    const [techStack, setTechStack] = useState([]);

    const [selectedDesired, setSelectedDesired] = useState(new Set());
    const [selectedTech, setSelectedTech] = useState(new Set());
    const [selectedJob, setSelectedJob] = useState(null);

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

    const colors = [
        "#A7C7E7", "#B5EAD7", "#C7CEEA",
        "#FFDAC1", "#FFB7B2", "#E2F0CB",
    ];

    const getColorForItem = (item) => {
        let hash = 0;
        for (let i = 0; i < item.length; i++) {
            hash = item.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const toggleSelection = (section, value) => {
        const updater = section === 'desired' ? setSelectedDesired : setSelectedTech;
        const current = section === 'desired' ? selectedDesired : selectedTech;
        const next = new Set(current);
        next.has(value) ? next.delete(value) : next.add(value);
        updater(next);
    };

    const addTag = async (section) => {
        if (section === 'desired') {
            const name = desiredInput.trim();
            if (!name) return;
            if (!desiredJobs.includes(name)) {
                const newDesiredJobs = [...desiredJobs, name];
                setDesiredJobs(newDesiredJobs);
                setDesiredInput('');

                try {
                    await axios.put(
                        `http://localhost:8080/member/${user.id}/roles`,
                        newDesiredJobs,
                        { headers: { "Content-Type": "application/json" } }
                    );
                } catch (error) {
                    console.error("희망 직무 업데이트 실패:", error);
                    alert("직무 추가에 실패했습니다.");
                }
            }
        } else {
            const name = techInput.trim();
            if (!name) return;
            if (!techStack.includes(name)) {
                const newTechStack = [...techStack, name];
                setTechStack(newTechStack);

                try {
                    await axios.put(
                        `http://localhost:8080/member/${user.id}/skills`,
                        newTechStack,
                        { headers: { "Content-Type": "application/json" } }
                    );
                } catch (error) {
                    console.error("기술 스택 업데이트 실패:", error);
                    alert("스택 추가에 실패했습니다.");
                }

                setTechInput('');
            }
        }
    };

    const removeTag = async (section, value) => {
        if (section === 'desired') {
            const updated = desiredJobs.filter(job => job !== value);
            setDesiredJobs(updated);

            try {
                await axios.put(
                    `http://localhost:8080/member/${user.id}/roles`,
                    updated,
                    { headers: { "Content-Type": "application/json" } }
                );
            } catch (error) {
                console.error("희망 직무 삭제 실패:", error);
                alert("직무 삭제에 실패했습니다.");
            }

            setSelectedDesired(prev => {
                const next = new Set(prev);
                next.delete(value);
                return next;
            });
        } else {
            const updated = techStack.filter(tech => tech !== value);
            setTechStack(updated);

            try {
                await axios.put(
                    `http://localhost:8080/member/${user.id}/tech-stack`,
                    updated,
                    { headers: { "Content-Type": "application/json" } }
                );
            } catch (error) {
                console.error("기술 스택 삭제 실패:", error);
                alert("스택 삭제에 실패했습니다.");
            }

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

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8080/member/${user.id}`,
                {
                    name: editData.name,
                    phone: editData.phone,
                    email: editData.email,
                },
                { headers: { "Content-Type": "application/json" } }
            );
            setUser(response.data);
            setEditData(response.data);
            setIsEditing(false);
            alert("정보가 수정되었습니다.");
        } catch (error) {
            console.error("정보 수정 실패:", error);
            alert("정보 수정에 실패했습니다.");
        }
    };

    const handleCancel = () => {
        setEditData(user);
        setIsEditing(false);
    };

    const handleKeyUp = (e, section) => {
        if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
            e.preventDefault();
            addTag(section);
        }
    };

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/member/1`);
                const data = response.data;

                // user 정보 세팅
                setUser(data);
                setEditData(data);

                setDesiredJobs(data.desiredRoles || []);
                setTechStack(data.skills || []);

                // 관심기업 불러오기
                const favResponse = await axios.get("http://localhost:8080/api/jobs/favorite");
                const favorites = favResponse.data;
                setUser(prev => ({
                    ...prev,
                    interests: favorites  // user.interests로 연결
                }));
            } catch (error) {
                console.error("회원 정보 불러오기 실패:", error);
            }
        };
        fetchUser();
    }, []);

    if (!user) {
        return (
            <Spinner label="회원 정보를 불러오는 중..." />
        );
    }

    if (loading) {
        return (
            <Spinner label="로딩중..." />
        );
    }

    if (error) {
        return (
            <div className={styles['info']}>
                오류 발생: {error.message}
            </div>
        );
    }

    return (
        <div className={styles['profile-page']}>
            <div className={styles['profile-container']}>
                <div className={styles['profile-left']}>
                    <div className={styles['profile-image-info']}>
                        <div
                            className={styles['profile-image']}
                            onClick={handleDivClick}
                            style={{
                                backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                cursor: 'pointer',
                            }}
                        ></div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
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
                                        value={editData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
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
                                    <p>{user.email}</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* 희망 직무 */}
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
                                onKeyDown={(e) => handleKeyUp(e, 'desired')}
                                className="tag-input"
                            />
                            <button type="button" className={styles['add-btn']} onClick={() => addTag('desired')}>추가</button>
                        </div>
                    </div>

                    {/* 기술 스택 */}
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
                                onKeyDown={(e) => handleKeyUp(e, 'tech')}
                                className="tag-input"
                            />
                            <button type="button" className={styles['add-btn']} onClick={() => addTag('tech')}>추가</button>
                        </div>
                    </div>

                </div>

                {/* 우측 영역 */}
                <div className={styles['profile-right']}>


                    {/* 관심 기업 */}
                    <div className={styles['interests']}>
                        <h3>관심 기업</h3>
                        <div className={styles['circle-list']}>
                            {(user.interests || []).map((item, idx) => (
                                <div
                                    key={idx}
                                    className={styles.circle}
                                    style={{ backgroundColor: getColorForItem(item.companyName) }}
                                    onClick={() => item.applyLink && window.open(item.applyLink, "_blank")}
                                >
                                    <img
                                        src={item.companyLogo || defaultLogo}
                                        alt={item.companyName}
                                        className={styles['circle-logo']}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 프로젝트 */}
                    <div className={styles.projects}>
                        <h3>나의 프로젝트</h3>
                        <ProjectBoard
                            projects={projects}
                            onSelect={(proj) => setSelectedProject(proj)} // 카드 클릭 시 모달 열기
                        />
                    </div>


                    {/* 지원한 공고 */}
                    <div className={styles['applied-jobs']}>
                        <h3>지원한 공고</h3>
                        <div className={styles['job-cards']}>
                            {(user.appliedJobs || []).map((job, idx) => (
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

                {/* 모달 */}
                <div className={styles['profile-modal']}>
                    {selectedProject && (
                        <ProjectModal
                            project={selectedProject}
                            onClose={() => setSelectedProject(null)}
                            onUpdate={(updatedProject) => setSelectedProject(updatedProject)}
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
