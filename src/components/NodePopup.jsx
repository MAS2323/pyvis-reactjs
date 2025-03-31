import React from "react";

const NodePopup = ({ entity, onClose }) => {
  const { data } = entity;

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 1000,
        background: "white",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        maxWidth: "300px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>Detalles del Nodo</h3>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          ×
        </button>
      </div>
      <hr style={{ margin: "5px 0" }} />
      <p>
        <strong>SN:</strong> {data.sn}
      </p>
      <p>
        <strong>Tipo:</strong> {data.Type || "N/A"}
      </p>
      <p>
        <strong>Nombre:</strong> {data.name || "N/A"}
      </p>
      <p>
        <strong>Ubicación:</strong> {data.location || "N/A"}
      </p>
      {data.additionalInfo && (
        <p>
          <strong>Info adicional:</strong> {data.additionalInfo}
        </p>
      )}
    </div>
  );
};

export default NodePopup;
