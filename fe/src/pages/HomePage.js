import '../styles/HomePage.css';

export default function HomePage() {
    return (
        <div className="mainpage">
            <header className="header">
                <h1>JobMatch</h1>
                <nav className="nav">
                    <a href="#">채용공고</a>
                    <a href="#">기업분석</a>
                    <a href="#">마이페이지</a>
                </nav>
                <button className="login-btn">로그인</button>
            </header>

            {/* Hero */}
            <section className="hero">
                <h2>AI 기반 맞춤형 채용 공고 모니터링</h2>
                <p>관심 기업의 채용 소식을 매일 확인하세요</p>
                <div style={{ display: "flex", maxWidth: "400px", margin: "20px auto" }}>
                    <input type="text" placeholder="회사명 / 직무 검색" />
                    <button className="search-btn">검색</button>
                </div>
            </section>

            {/* 카드 예시 */}
            <section style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
                <h3 style={{ color: "#4B83C1" }}>오늘의 추천 채용 공고</h3>
                <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <div className="card">
                        <h4>프론트엔드 개발자</h4>
                        <p>서울 · 정규직</p>
                    </div>
                    <div className="card">
                        <h4>데이터 분석가</h4>
                        <p>서울 · 정규직</p>
                    </div>
                    <div className="card">
                        <h4>UX 디자이너</h4>
                        <p>서울 · 정규직</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
