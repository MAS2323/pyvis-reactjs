import React from "react";

const NodePopup = ({ nodeInfo, fibcabs, onClose }) => {
  return (
    <div className="popup">
      <h3>Node Information</h3>
      {nodeInfo ? (
        <>
          <p>
            <strong>Name:</strong> {nodeInfo.name || "N/A"}
          </p>
          <p>
            <strong>SN:</strong> {nodeInfo.sn || "N/A"}
          </p>
          <p>
            <strong>Location:</strong> Lat: {nodeInfo.latitude}, Lon:{" "}
            {nodeInfo.longitude}
          </p>
        </>
      ) : (
        <p>No node information available.</p>
      )}

      <h4>Fibcabs Associated with this Node</h4>
      {fibcabs.length > 0 ? (
        <ul>
          {fibcabs.map((fibcab, index) => (
            <li key={index}>
              <strong>ID:</strong> {fibcab.id || "N/A"},{" "}
              <strong>Status:</strong> {fibcab.status || "N/A"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No fibcabs associated with this node.</p>
      )}

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NodePopup;
