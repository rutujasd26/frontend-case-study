import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./components/Admin";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import "./App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <nav className="navbar navbar-dark bg-primary shadow-lg">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand text-white fw-bold" to="/">🏠 Home</Link>
        {isAuthenticated ? (
          <>
            <Link className="text-white fw-bold" to="/admin">🛠 Admin</Link>
            <button className="btn btn-danger" onClick={() => { localStorage.removeItem("isAuthenticated"); navigate("/signin"); }}>Logout</button>
          </>
        ) : (
          <>
            <Link className="text-white fw-bold" to="/signin">🔑 Signin</Link>
            <Link className="text-white fw-bold" to="/signup">📝 Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
