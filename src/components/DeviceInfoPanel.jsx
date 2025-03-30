import React from "react";

const DeviceInfoPanel = ({ device, onClose }) => {
  if (!device) return null;

  return (
    <div className="info-panel">
      <h3>Información del Dispositivo</h3>
      <div className="panel-content">
        <p>
          <strong>Nombre:</strong> {device.name || "N/A"}
        </p>
        <p>
          <strong>Tipo:</strong> {device.type || "N/A"}
        </p>
        <p>
          <strong>Estado:</strong> {device.status || "N/A"}
        </p>
        {/* Agrega más campos según necesites */}
      </div>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DeviceInfoPanel;
