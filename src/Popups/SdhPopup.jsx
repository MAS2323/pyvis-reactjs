import React from "react";

const SdhPopup = ({ sdh, onClose }) => {
  if (!sdh) return null;

  return (
    <div className="cesium-popup">
      <h3>Información SDH</h3>
      <div className="popup-content">
        <p>
          <strong>Serial:</strong> {sdh.sn || "N/A"}
        </p>
        <p>
          <strong>Modelo:</strong> {sdh.model || "N/A"}
        </p>
        <p>
          <strong>Capacidad:</strong> {sdh.capacity || "N/A"}
        </p>
        <p>
          <strong>Estado:</strong> {sdh.status || "N/A"}
        </p>
        <p>
          <strong>IP:</strong> {sdh.ip_address || "N/A"}
        </p>
      </div>
      <button className="popup-close-btn" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
};

export default SdhPopup;
