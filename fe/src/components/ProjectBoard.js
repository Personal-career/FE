// ProjectBoard.js
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import styles from "../styles/components/ProjectBoard.module.css"; // 스타일 분리

export default function ProjectBoard({ projects, onSelect }) {
    console.log(projects.techStack);

    return (
        <div className={styles['project-board']}>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    1200: { slidesPerView: 3 },
                    768: { slidesPerView: 2 },
                    480: { slidesPerView: 1 },
                }}
            >
                {projects.map((proj, idx) => (
                    <SwiperSlide key={proj.id ? proj.id : idx}>
                        <div
                            className={styles['project-card']}
                            onClick={() => onSelect && onSelect(proj)} // 클릭 이벤트 연결
                        >
                            <h4>{proj.name || "프로젝트 이름 없음"}</h4>
                            <p><strong>기간:</strong> {proj.period || "정보 없음"}</p>
                            <p><strong>기술:</strong> {proj.techStack.length > 0 ? proj.techStack.join(", ") : "정보 없음"}</p>
                            <p><strong>설명:</strong> {proj.description || "설명 없음"}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
