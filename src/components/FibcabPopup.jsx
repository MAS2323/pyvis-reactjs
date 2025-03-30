import React from "react";

const FibcabPopup = ({ fibcabInfo, onClose }) => {
  return (
    <div className="popup">
      <h3>Fibcab Information</h3>
      {fibcabInfo ? (
        <>
          <p>
            <strong>ID:</strong> {fibcabInfo.id || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {fibcabInfo.status || "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {fibcabInfo.location || "N/A"}
          </p>
        </>
      ) : (
        <p>No fibcab information available.</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FibcabPopup;
