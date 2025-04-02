import React, { useEffect, useState } from "react";
import { fetchFibcabState, calculateFibcabParameters } from "../../helpers/api";
import BottleneckIndicator from "../../components/viewer/BottleneckIndicator";

const FibcabLeftPanel = ({ data, onClose }) => {
  const [fibcabState, setFibcabState] = useState(null);
  const [fibcabParams, setFibcabParams] = useState(null);
  const [loading, setLoading] = useState({
    state: false,
    params: false,
  });

  useEffect(() => {
    if (data?.sn) {
      // Cargar estado de la fibra
      setLoading((prev) => ({ ...prev, state: true }));
      const fetchState = async () => {
        try {
          const state = await fetchFibcabState(data.sn);
          setFibcabState(state);
        } catch (error) {
          console.error("Error fetching fibcab state:", error);
        } finally {
          setLoading((prev) => ({ ...prev, state: false }));
        }
      };

      // Cargar parámetros calculados
      setLoading((prev) => ({ ...prev, params: true }));
      const fetchParams = async () => {
        try {
          const params = await calculateFibcabParameters(data.sn);
          setFibcabParams(params);
        } catch (error) {
          console.error("Error calculating fibcab parameters:", error);
        } finally {
          setLoading((prev) => ({ ...prev, params: false }));
        }
      };

      fetchState();
      fetchParams();
    }
  }, [data?.sn]);

  const detailedInfo = {
    Identificación: {
      "Tag ID": data.tagId || "N/A",
      SN: data.sn || "N/A",
      "ID de Grupo": data.gId || "N/A",
    },
    Conexiones: {
      Origen: data.source_sn || "N/A",
      Destino: data.target_sn || "N/A",
      "Ciudad Origen": data.source_city || "N/A",
      "Ciudad Destino": data.target_city || "N/A",
    },
  };

  // Añadir parámetros técnicos si están disponibles
  if (fibcabParams) {
    detailedInfo["Parámetros Técnicos"] = {
      Distancia: fibcabParams.distance_km
        ? `${fibcabParams.distance_km} km`
        : "N/A",
      "Atenuación Total": fibcabParams.total_attenuation_db
        ? `${fibcabParams.total_attenuation_db} dB`
        : "N/A",
      Capacidad: fibcabParams.fibcab_capacity
        ? `${fibcabParams.fibcab_capacity} Gbps`
        : "N/A",
      "Coef. Atenuación": fibcabParams.attenuation_coefficient_db_per_km
        ? `${fibcabParams.attenuation_coefficient_db_per_km} dB/km`
        : "N/A",
    };
  }

  // Añadir estado FIBCAB si está disponible
  if (fibcabState) {
    detailedInfo["Estado"] = {
      "Punto de Salud":
        fibcabState.health_point !== null
          ? `${fibcabState.health_point}%`
          : "N/A",
      Advertencias: fibcabState.warnings || "Ninguna",
      Crisis: fibcabState.crisis || "Ninguna",
      ...(fibcabState.warnlog_url
        ? {
            "Log Advertencias": (
              <a
                href={fibcabState.warnlog_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver
              </a>
            ),
          }
        : {}),
      ...(fibcabState.crislog_url
        ? {
            "Log Crisis": (
              <a
                href={fibcabState.crislog_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver
              </a>
            ),
          }
        : {}),
      ...(fibcabState.rawfile_url
        ? {
            "Datos RAW": (
              <a
                href={fibcabState.rawfile_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Descargar
              </a>
            ),
          }
        : {}),
    };
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "70px",
        left: "20px",
        width: "450px",
        background: "#0009",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        padding: "15px",
        zIndex: 1000,
        maxHeight: "80vh",
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
        <h3 style={{ margin: 0, color: "#2c3e50" }}>
          Detalles de Fibra - {data.sn}
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

      {(loading.state || loading.params) && (
        <div style={{ textAlign: "center", padding: "10px", color: "#7f8c8d" }}>
          Cargando información...
        </div>
      )}

      {/* Indicador de cuello de botella */}
      {fibcabParams && fibcabState && (
        <BottleneckIndicator
          capacity={fibcabParams.fibcab_capacity}
          health={fibcabState.health_point}
        />
      )}

      {Object.entries(detailedInfo).map(([category, fields]) => (
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
                  {typeof value === "string" ? value : value}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FibcabLeftPanel;
