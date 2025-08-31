import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true; // important to send cookies

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchMe = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => { fetchMe(); }, []);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        {!user && <Link to="/register" style={{ marginRight: 10 }}>Register</Link>}
        {!user && <Link to="/login">Login</Link>}
        {user && <button onClick={handleLogout} style={{ marginLeft: 10 }}>Logout</button>}
      </nav>

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/register" element={<Register onAuth={fetchMe} />} />
        <Route path="/login" element={<Login onAuth={fetchMe} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </div>
  );
}

function Home({ user }) {
  return (
    <div>
      <h2>Welcome to MERN Auth</h2>
      {user ? <p>Logged in as <strong>{user.name}</strong>. Go to <Link to="/dashboard">Dashboard</Link></p> :
        <p>Please <Link to="/login">login</Link> or <Link to="/register">register</Link>.</p>}
    </div>
  );
}
