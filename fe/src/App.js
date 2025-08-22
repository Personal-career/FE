import './App.css';

import HomePage from "./pages/HomePage";
import MainPage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Portfolio from "./pages/Portfolio";

function App() {
  return (
      <div className="App">
        <HomePage />
          {/*<Login />*/}
          {/*<Register/>*/}
          <Portfolio/>
      </div>
  );
}

export default App;

