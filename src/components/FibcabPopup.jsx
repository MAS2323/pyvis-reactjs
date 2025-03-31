import React from "react";

const FibcabPopup = ({ entity, onClose }) => {
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
        <h3 style={{ margin: 0 }}>Detalles de la Fibra</h3>
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
        <strong>Longitud:</strong> {data.length || "N/A"} m
      </p>
      <p>
        <strong>Tipo de fibra:</strong> {data.fiberType || "N/A"}
      </p>
      <p>
        <strong>Estado:</strong> {data.status || "N/A"}
      </p>
      <p>
        <strong>Origen:</strong> {data.source_name || "N/A"}
      </p>
      <p>
        <strong>Destino:</strong> {data.target_name || "N/A"}
      </p>
    </div>
  );
};

export default FibcabPopup;
