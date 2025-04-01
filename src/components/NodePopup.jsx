import React from "react";

const NodePopup = ({ entity, onClose }) => {
  const { data } = entity;

  // Datos básicos para el panel derecho
  const basicInfo = {
    Identificación: {
      SN: data.sn,
      "ID de Grupo": data.gId,
      Nombre: data.name,
      Fabricante: data.Producer,
    },
  };

  // Resto de la información para el panel izquierdo
  const additionalInfo = {
    Ubicación: {
      Ciudad: data.city,
      Ubicación: data.location,
      Longitud: data.longitude,
      Latitud: data.lattitude,
    },
    "Dispositivos Relacionados": {
      "FIBCAB Fuente": data.fibcab_source,
      "FIBCAB Destino": data.fibcab_target,
      JMPMAT: data.jmpmat,
    },
    "Información Técnica": {
      "Traffic Stub Info": data.traffstub_dev_info,
      "SDH Info": data.sdh_dev_info,
      "IOLP Info": data.iolp_dev_info,
    },
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px", // Posicionado a la derecha
        zIndex: 1000,
        background: "#fff",
        padding: "0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "600px", // Ancho mayor para acomodar ambos paneles
        maxHeight: "80vh",
        overflow: "hidden",
        marginTop: "60px",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        display: "flex", // Usamos flex para dividir los paneles
      }}
    >
      {/* Panel izquierdo - Información adicional */}
      <div
        style={{
          flex: 2,
          padding: "15px",
          overflowY: "auto",
          borderRight: "1px solid #ecf0f1",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0, color: "#2c3e50" }}>
            Detalles del Dispositivo
          </h3>
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

        <hr style={{ margin: "10px 0", borderColor: "#ecf0f1" }} />

        {Object.entries(additionalInfo).map(([category, fields]) => (
          <div key={category} style={{ marginBottom: "15px" }}>
            <h4
              style={{
                margin: "0 0 8px 0",
                paddingBottom: "5px",
                borderBottom: "1px solid #ecf0f1",
                color: "#3498db",
              }}
            >
              {category}
            </h4>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {Object.entries(fields).map(([label, value]) => (
                <React.Fragment key={label}>
                  <div style={{ fontWeight: "bold", color: "#7f8c8d" }}>
                    {label}:
                  </div>
                  <div style={{ wordBreak: "break-word" }}>
                    {value !== null && value !== undefined ? value : "N/A"}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Panel derecho - Información básica */}
      <div
        style={{
          flex: 1,
          padding: "15px",
          background: "#f8f9fa",
          overflowY: "auto",
        }}
      >
        <h3
          style={{
            margin: "0 0 15px 0",
            color: "#2c3e50",
            textAlign: "center",
          }}
        >
          Identificación
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {Object.entries(basicInfo.Identificación).map(([label, value]) => (
            <div key={label}>
              <div
                style={{
                  fontWeight: "bold",
                  color: "#7f8c8d",
                  fontSize: "0.9rem",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  wordBreak: "break-word",
                  padding: "5px",
                  background: "#fff",
                  borderRadius: "4px",
                  border: "1px solid #ecf0f1",
                }}
              >
                {value !== null && value !== undefined ? value : "N/A"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NodePopup;
