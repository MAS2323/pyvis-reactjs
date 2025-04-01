import React from "react";

const FibcabPopup = ({ entity, onClose }) => {
  const { data } = entity;

  // Mapear los nombres de los campos según lo que recibes del servidor
  const fiberData = {
    sn: data.sn || "N/A",
    length: data.length || data.cable_length || "N/A",
    fiberType: data.fiber_type || data.type || "N/A",
    status: data.status || data.operational_status || "N/A",
    source: data.source_name || data.source_device || "N/A",
    target: data.target_name || data.target_device || "N/A",
    // Agrega más mapeos según necesites
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 1000,
        background: "#0009",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        maxWidth: "300px",
        marginTop: 60,
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
        <strong>SN:</strong> {fiberData.sn}
      </p>
      <p>
        <strong>Longitud:</strong> {fiberData.length} m
      </p>
      <p>
        <strong>Tipo de fibra:</strong> {fiberData.fiberType}
      </p>
      <p>
        <strong>Estado:</strong> {fiberData.status}
      </p>
      <p>
        <strong>Origen:</strong> {fiberData.source}
      </p>
      <p>
        <strong>Destino:</strong> {fiberData.target}
      </p>
    </div>
  );
};

export default FibcabPopup;
