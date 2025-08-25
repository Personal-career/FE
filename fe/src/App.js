import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useState} from "react";
import Portfolio from "./pages/Portfolio";
import EmploymentPage from "./pages/EmploymentPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
                <Route path="/signup" element={<Register/>}/>
                <Route path="/portfolio" element={<Portfolio/>}/>
                <Route path="/employment/:empSeqno" element={<EmploymentPage />} />
            </Routes>
        </Router>
    );
}
export default App;
