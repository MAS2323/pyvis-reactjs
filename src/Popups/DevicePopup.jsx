import React from "react";

const DevicePopup = ({ device, onClose }) => {
  if (!device) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "#0009",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
        maxWidth: "400px",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <h3>Información del Dispositivo</h3>
      <div style={{ margin: "15px 0" }}>
        <p>
          <strong>Nombre:</strong> {device.name || "N/A"}
        </p>
        <p>
          <strong>Serial:</strong> {device.sn || "N/A"}
        </p>
        <p>
          <strong>Tipo:</strong> {device.type || "N/A"}
        </p>
        <p>
          <strong>Ciudad:</strong> {device.city || "N/A"}
        </p>
        <p>
          <strong>Ubicación:</strong> {device.location || "N/A"}
        </p>

        {device.fibcabs?.length > 0 && (
          <>
            <h4>Fibcabs Conectados ({device.fibcabs.length})</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {device.fibcabs.map((fibcab) => (
                <li
                  key={fibcab.sn}
                  style={{
                    marginBottom: "8px",
                    padding: "8px",
                    background: "#0009",
                    borderRadius: "4px",
                  }}
                >
                  <strong>SN:</strong> {fibcab.sn}
                  <br />
                  <strong>Modelo:</strong> {fibcab.model || "N/A"}
                  <br />
                  <strong>Estado:</strong> {fibcab.status || "N/A"}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <button
        onClick={onClose}
        style={{
          marginTop: "15px",
          padding: "8px 16px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Cerrar
      </button>
    </div>
  );
};

export default DevicePopup;
