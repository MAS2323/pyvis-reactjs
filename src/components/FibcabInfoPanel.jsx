import React from "react";

const FibcabInfoPanel = ({ fibcab, onClose }) => {
  if (!fibcab) return null;

  return (
    <div className="info-panel">
      <h3>Información de Fibcab</h3>
      <div className="panel-content">
        <p>
          <strong>ID:</strong> {fibcab.id || "N/A"}
        </p>
        <p>
          <strong>Tipo:</strong> {fibcab.Type || fibcab.type || "N/A"}
        </p>
        <p>
          <strong>Origen:</strong> {fibcab.source_sn || "N/A"}
        </p>
        {/* Agrega más campos según necesites */}
      </div>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default FibcabInfoPanel;
