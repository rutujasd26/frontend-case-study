import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful! Please login.");
    navigate("/signin");
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" required onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input type="password" placeholder="Password" required onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
