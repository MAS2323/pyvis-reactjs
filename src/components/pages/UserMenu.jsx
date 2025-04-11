import React from "react";
import "./styles/UserMenu.css";

export default function UserMenu({ closeMenu, onLogout }) {
  const user = {
    name: "Mas Onewe",
    email: "masonewe@gmail.com",
    avatar: "https://via.placeholder.com/40",
  };

  const handleLogout = () => {
    onLogout(); // Trigger the logout function
    closeMenu(); // Close the menu after logout
  };

  return (
    <div className="user-menu">
      <div className="user-profile">
        <img src={user.avatar} alt={user.name} className="user-avatar" />
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-email">{user.email}</span>
        </div>
      </div>
      <button className="manage-account-btn">Manage your Google Account</button>
      <div className="menu-options">
        <button className="menu-option">
          <i className="fas fa-user-plus" />
          Add another account
        </button>
        <button className="menu-option" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" />
          Sign out
        </button>
        <hr className="divider" />
        <button className="menu-option">
          <i className="fas fa-cog" />
          Settings
        </button>
        <button className="menu-option">
          <i className="fas fa-question-circle" />
          Help
        </button>
        <button className="menu-option">
          <i className="fas fa-comment-dots" />
          Feedback
        </button>
      </div>
      <div className="footer-links">
        <a href="/privacy" className="footer-link">
          Privacy Policy
        </a>
        <span className="dot">•</span>
        <a href="/terms" className="footer-link">
          Terms of Service
        </a>
      </div>
    </div>
  );
}
