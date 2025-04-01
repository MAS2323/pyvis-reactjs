import React from "react";

const FibcabRightPanel = ({ data }) => {
  // Información básica de la fibra
  const basicInfo = {
    Tipo: data.Type || "Fibra Óptica",
    "SN Principal": data.sn || "N/A",
    "Dispositivo Origen": data.source_sn || "N/A",
    "Dispositivo Destino": data.target_sn || "N/A",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px", // Cambiado a posición inferior
        right: "20px",
        width: "300px",
        background: "#0009",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        padding: "15px",
        zIndex: 1000,
        maxHeight: "30vh", // Altura reducida
        overflowY: "auto",
        borderTop: "3px solid #3498db",
      }}
    >
      <h3
        style={{
          margin: "0 0 10px 0", // Margen reducido
          color: "#2c3e50",
          textAlign: "center",
          fontSize: "1.1rem", // Tamaño de fuente ajustado
        }}
      >
        Resumen de Fibra
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {" "}
        {/* Espacio reducido */}
        {Object.entries(basicInfo).map(([label, value]) => (
          <div key={label} style={{ marginBottom: "4px" }}>
            {" "}
            {/* Margen inferior reducido */}
            <div
              style={{
                fontWeight: "bold",
                color: "#7f8c8d",
                fontSize: "0.85rem", // Fuente más pequeña
              }}
            >
              {label}
            </div>
            <div
              style={{
                wordBreak: "break-word",
                padding: "4px", // Padding reducido
                background: "#0009",
                borderRadius: "3px", // Bordes más pequeños
                border: "1px solid #ecf0f1",
                fontSize: "0.85rem", // Fuente más pequeña
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FibcabRightPanel;
