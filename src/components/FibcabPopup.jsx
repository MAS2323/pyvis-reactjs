import React, { useEffect, useState } from "react";
import { fetchFibcabState } from "../helpers/api";

const FibcabPopup = ({ entity, onClose }) => {
  const { data } = entity;
  const [fibcabState, setFibcabState] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?.sn) {
      setLoading(true);
      const fetchState = async () => {
        try {
          const state = await fetchFibcabState(data.sn);
          setFibcabState(state);
        } catch (error) {
          console.error("Error fetching fibcab state:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchState();
    }
  }, [data?.sn]);

  // Información básica de la fibra (panel derecho)
  const basicInfo = {
    SN: data.sn || "N/A",
    Longitud: data.length ? `${data.length} m` : "N/A",
    "Tipo de fibra": data.fiber_type || data.type || "N/A",
    "Estado operativo": data.status || data.operational_status || "N/A",
  };

  // Información detallada (panel izquierdo)
  const detailedInfo = {
    Conexiones: {
      Origen: data.source_name || data.source_device || "N/A",
      Destino: data.target_name || data.target_device || "N/A",
      "Ciudad origen": data.source_city || "N/A",
      "Ciudad destino": data.target_city || "N/A",
    },
    Configuración: {
      Capacidad: data.ficab_capacity ? `${data.ficab_capacity} Gbps` : "N/A",
      "Mapa FC activo": data.opt1_active_fc_map || "N/A",
      "Coef. atenuación": data.opt2_fiber_attnuetion_coeff
        ? `${data.opt2_fiber_attnuetion_coeff} dB/km`
        : "N/A",
    },
  };

  // Añadir estado FIBCAB si está disponible
  if (fibcabState) {
    detailedInfo["Estado FIBCAB"] = {
      "Punto de salud":
        fibcabState.health_point !== null
          ? `${fibcabState.health_point}%`
          : "N/A",
      Advertencias: fibcabState.warnings || "Ninguna",
      Crisis: fibcabState.crisis || "Ninguna",
      ...(fibcabState.warnlog_url
        ? {
            "Log advertencias": (
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
            "Log crisis": (
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
            "Archivo RAW": (
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
        right: "20px",
        width: "700px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        padding: "0",
        zIndex: 1000,
        maxHeight: "80vh",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* Panel izquierdo - Información detallada */}
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
          <h3 style={{ margin: 0, color: "#2c3e50" }}>Detalles de la Fibra</h3>
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

        {loading && !fibcabState && (
          <div
            style={{ textAlign: "center", padding: "10px", color: "#7f8c8d" }}
          >
            Cargando estado FIBCAB...
          </div>
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
          Información Básica
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {Object.entries(basicInfo).map(([label, value]) => (
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
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FibcabPopup;
