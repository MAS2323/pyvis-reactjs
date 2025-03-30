import React from "react";

const FibcabPopup = ({ fibcab, onClose }) => {
  if (!fibcab) return null;

  return (
    <div className="cesium-popup">
      <h3>Detalles de Fibcab</h3>
      <div className="popup-content">
        <p>
          <strong>Serial:</strong> {fibcab.sn || "N/A"}
        </p>
        <p>
          <strong>Modelo:</strong> {fibcab.model || "N/A"}
        </p>
        <p>
          <strong>Estado:</strong> {fibcab.status || "N/A"}
        </p>
        <p>
          <strong>Última conexión:</strong> {fibcab.last_connection || "N/A"}
        </p>
        <p>
          <strong>Firmware:</strong> {fibcab.firmware_version || "N/A"}
        </p>
      </div>
      <button className="popup-close-btn" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
};

export default FibcabPopup;
