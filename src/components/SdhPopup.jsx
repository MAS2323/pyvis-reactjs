import React from "react";

const SdhPopup = ({ sdhInfo, sdhConfig, sdhState, onClose }) => {
  return (
    <div className={`popup ${sdhInfo ? "" : "hidden"}`}>
      <h3>SDH Information</h3>
      <div>
        <h4>SDH Dev Info</h4>
        <pre>{JSON.stringify(sdhInfo, null, 2)}</pre>
        <h4>SDH Dev Config</h4>
        <pre>{JSON.stringify(sdhConfig, null, 2)}</pre>
        <h4>SDH Dev State</h4>
        <pre>{JSON.stringify(sdhState, null, 2)}</pre>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SdhPopup;
