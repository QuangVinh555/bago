import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home /> } />
            <Route path="/profile/:username" element={<Profile />} />    
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/messenger" element={<Messenger />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
