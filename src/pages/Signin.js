import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === credentials.email && storedUser.password === credentials.password) {
      localStorage.setItem("isAuthenticated", "true");
      alert("Login successful!");
      navigate("/admin");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="container">
      <h2>Signin</h2>
      <form onSubmit={handleSignin}>
        <input type="email" placeholder="Email" required onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
        <input type="password" placeholder="Password" required onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
        <button type="submit">Signin</button>
      </form>
    </div>
  );
};

export default Signin;
