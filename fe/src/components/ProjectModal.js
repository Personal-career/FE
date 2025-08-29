import React, { useState, useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";

export default function ProjectModal({ project, onClose, onUpdate, onDelete  }) {
    console.log("project modal :", project)

    const [editing, setEditing] = useState(!project.id);
    const [tempProject, setTempProject] = useState({
        ...project,
        techStack: []
    });

    const [newTech, setNewTech] = useState("");

    const handleSave = () => {
        if (!tempProject.name.trim()) {
            alert("프로젝트 이름은 필수입니다.");
            return;
        }
        // techStack 배열 → 문자열로 변환
        const projectToSend = {
            ...tempProject,
            techStack: tempProject.techStack.join(", ") // ["React","Spring"] → "React, Spring"
        };

        onUpdate(projectToSend); // 부모에서 POST 요청 처리
        setEditing(false);
    };

    const handleAddTech = () => {
        if (newTech.trim() && !tempProject.techStack.includes(newTech)) {
            setTempProject({
                ...tempProject,
                techStack: [...tempProject.techStack, newTech],
            });
            setNewTech("");
        }
    };

    const handleRemoveTech = (tech) => {
        setTempProject({
            ...tempProject,
            techStack: tempProject.techStack.filter((t) => t !== tech),
        });
    };

    const handleDelete = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            onDelete(project.id); // 부모에서 삭제 API 호출
            onClose(); // 모달 닫기
        }
    };

    useEffect(() => {
        setTempProject({
            ...project,
            techStack: project.techStack
                ? (Array.isArray(project.techStack) ? project.techStack : project.techStack.split(",").map(s => s.trim()))
                : []
        });
    }, [project]);

    return (
        <div className={styles.overlay}>
            <div className={styles.content}>
                <h2>{editing ? "프로젝트 수정" : "프로젝트 상세"}</h2>
                {editing ? (
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>이름</label>
                            <input
                                type="text"
                                value={tempProject.name}
                                onChange={(e) =>
                                    setTempProject({ ...tempProject, name: e.target.value })
                                }
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>기간</label>
                            <input
                                type="text"
                                value={tempProject.period}
                                onChange={(e) =>
                                    setTempProject({ ...tempProject, period: e.target.value })
                                }
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>종류</label>
                            <input
                                type="text"
                                value={tempProject.type}
                                onChange={(e) =>
                                    setTempProject({ ...tempProject, type: e.target.value })
                                }
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>기술</label>
                            <input
                                type="text"
                                value={tempProject.techStack.join(", ")}
                                onChange={(e) =>
                                    setTempProject({
                                        ...tempProject,
                                        techStack: e.target.value.split(",").map((s) => s.trim()),
                                    })
                                }
                            />
                            <small>쉼표(,)로 구분</small>
                        </div>
                        <div className={styles.formGroup}>
                            <label>설명</label>
                            <textarea
                                value={tempProject.description}
                                onChange={(e) =>
                                    setTempProject({ ...tempProject, description: e.target.value })
                                }
                            />
                        </div>



                        <button type="button" onClick={handleSave} className={styles.saveBtn}>
                            저장
                        </button>
                    </form>
                ) : (
                    <>
                        <p>이름: {project.name}</p>
                        <p>기간: {project.period}</p>
                        <p>종류: {project.type}</p>
                        <p>설명: {project.description}</p>
                        <p>
                          스택: {(Array.isArray(project.techStack) ? project.techStack : project.techStack?.split(",") || []).join(", ")}
                        </p>
                    </>
                )}

                <div className={styles.actions}>
                    <button className={styles['delete-btn']} onClick={handleDelete}>
                        삭제
                    </button>
                    <button onClick={() => setEditing(!editing)}>
                        {editing ? "취소" : "수정"}
                    </button>

                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}
