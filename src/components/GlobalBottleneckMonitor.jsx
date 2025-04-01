import React, { useEffect, useState } from "react";
import { fetchBottlenecks } from "../helpers/api";

const GlobalBottleneckMonitor = () => {
  const [bottlenecks, setBottlenecks] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkBottlenecks = async () => {
      try {
        const data = await fetchBottlenecks();
        setBottlenecks(data);
        setVisible(data.length > 0);
      } catch (error) {
        console.error("Error checking bottlenecks:", error);
      }
    };

    // Verificar cada 5 minutos
    checkBottlenecks();
    const interval = setInterval(checkBottlenecks, 300000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        width: "300px",
        background: "#0009",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        padding: "15px",
        zIndex: 1001,
        borderLeft: "5px solid #e53935",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, color: "#e53935" }}>Alertas de Red</h3>
        <button
          onClick={() => setVisible(false)}
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

      <div style={{ marginTop: "10px" }}>
        {bottlenecks.map((bottleneck, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              padding: "8px",
              background: "#ffebee",
              borderRadius: "4px",
            }}
          >
            <div style={{ fontWeight: "bold" }}>Fibra: {bottleneck.sn}</div>
            <div>Utilización: {bottleneck.utilization_percentage}%</div>
            <div style={{ color: "#e53935", fontWeight: "bold" }}>
              {bottleneck.utilization_percentage > 90
                ? "CRÍTICO"
                : "ADVERTENCIA"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalBottleneckMonitor;
