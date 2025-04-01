import React, { useState, useEffect } from "react";
import { calculateFibcabParameters } from "../helpers/api";

const FibcabParameters = ({ fibcabSn }) => {
  const [parameters, setParameters] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fibcabSn) return;

    const fetchParameters = async () => {
      setLoading(true);
      try {
        const data = await calculateFibcabParameters(fibcabSn);
        setParameters(data);
      } catch (error) {
        console.error("Error fetching fibcab parameters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParameters();
  }, [fibcabSn]);

  if (!parameters) return null;

  return (
    <div
      style={{
        background: "#f8f9fa",
        padding: "15px",
        borderRadius: "8px",
        marginTop: "15px",
      }}
    >
      <h4 style={{ margin: "0 0 10px 0", color: "#2c3e50" }}>
        Parámetros Técnicos
      </h4>

      {loading ? (
        <div style={{ textAlign: "center", padding: "10px" }}>
          Calculando parámetros...
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#7f8c8d" }}>Distancia:</div>
          <div>{parameters.distance_km} km</div>

          <div style={{ fontWeight: "bold", color: "#7f8c8d" }}>
            Atenuación Total:
          </div>
          <div>{parameters.total_attenuation_db} dB</div>

          <div style={{ fontWeight: "bold", color: "#7f8c8d" }}>Capacidad:</div>
          <div>{parameters.fibcab_capacity} Gbps</div>

          <div style={{ fontWeight: "bold", color: "#7f8c8d" }}>
            Pérdida Conectores:
          </div>
          <div>{parameters.connector_loss_db} dB</div>

          <div style={{ fontWeight: "bold", color: "#7f8c8d" }}>
            Coef. Atenuación:
          </div>
          <div>{parameters.attenuation_coefficient_db_per_km} dB/km</div>
        </div>
      )}
    </div>
  );
};

export default FibcabParameters;
