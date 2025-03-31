import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="auth-container">
      <h1>Welcome to 基于PyViz的智能光SDH数字孪生前端技术研究</h1>
      <p>Please log in or register to continue.</p>
      <Link to="/login" className="btn">
        Go to Login
      </Link>
    </div>
  );
};

export default Welcome;
