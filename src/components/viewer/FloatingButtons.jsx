import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Asegurar la importación de Font Awesome

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <button id="modeToggle">
        <i className="fa-solid fa-globe"></i>
      </button>
      <button id="pinButton">
        <i className="fa-solid fa-map-pin"></i>
      </button>
      <button id="rulerButton">
        <i className="fa-solid fa-ruler"></i>
      </button>
    </div>
  );
};

export default FloatingButtons;
