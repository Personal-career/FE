import './App.css';

import HomePage from "./pages/HomePage";
import MainPage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register"

function App() {
  return (
      <div className="App">
        <HomePage />
          {/*<Login />*/}
          <Register/>
      </div>
  );
}

export default App;

