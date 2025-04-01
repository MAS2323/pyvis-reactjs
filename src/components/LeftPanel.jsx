import React from "react";

const LeftPanel = ({ data, onClose }) => {
  if (!data) return null;

  const additionalInfo = {
    Ubicación: {
      Ciudad: data.city,
      Dirección: data.location,
      Coordenadas: `${data.longitude}, ${data.lattitude}`,
    },
    Conexiones: {
      "FIBCAB Fuente": data.fibcab_source,
      "FIBCAB Destino": data.fibcab_target,
      JMPMAT: data.jmpmat,
    },
    "Información Técnica": {
      "Traffic Stub": data.traffstub_dev_info,
      SDH: data.sdh_dev_info,
      IOLP: data.iolp_dev_info,
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "70px",
        left: "20px",
        width: "400px",
        background: "#0009",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        padding: "15px",
        zIndex: 1000,
        maxHeight: "calc(100vh - 200px)",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, color: "#2c3e50" }}>Detalles Completos</h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
            color: "#7f8c8d",
          }}
        >
          ×
        </button>
      </div>

      <hr style={{ margin: "10px 0", borderColor: "#eee" }} />

      {Object.entries(additionalInfo).map(([category, fields]) => (
        <div key={category} style={{ marginBottom: "20px" }}>
          <h4
            style={{
              margin: "0 0 10px 0",
              color: "#3498db",
              fontSize: "1rem",
            }}
          >
            {category}
          </h4>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {Object.entries(fields).map(([label, value]) => (
              <React.Fragment key={label}>
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#7f8c8d",
                    fontSize: "0.9rem",
                  }}
                >
                  {label}:
                </div>
                <div style={{ wordBreak: "break-word", fontSize: "0.9rem" }}>
                  {value || "N/A"}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftPanel;
