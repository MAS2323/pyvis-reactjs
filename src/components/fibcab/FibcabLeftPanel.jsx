import React, { useEffect, useState } from "react";
import { fetchFibcabState } from "../../helpers/api";

const FibcabLeftPanel = ({ data, onClose }) => {
  const [fibcabState, setFibcabState] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?.sn) {
      setLoading(true);
      const fetchState = async () => {
        try {
          // Usamos el SN de la fibra para obtener su estado
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

  const detailedInfo = {
    Identificación: {
      "Tag ID": data.tagId || "N/A",
      SN: data.sn || "N/A",
      "ID de Grupo": data.gId || "N/A",
    },
    Conexiones: {
      "Dispositivo Origen": data.source_sn || "N/A",
      "Dispositivo Destino": data.target_sn || "N/A",
    },
  };

  // Añadir sección de estado si está disponible
  if (fibcabState) {
    detailedInfo["Estado de la Fibra"] = {
      "Punto de Salud":
        fibcabState.health_point !== null
          ? `${fibcabState.health_point}%`
          : "N/A",
      Advertencias: fibcabState.warnings || "Ninguna",
      Crisis: fibcabState.crisis || "Ninguna",
    };

    // Añadir URLs solo si existen
    if (
      fibcabState.warnlog_url ||
      fibcabState.crislog_url ||
      fibcabState.rawfile_url
    ) {
      detailedInfo["Enlaces"] = {
        ...(fibcabState.warnlog_url
          ? {
              "Log de Advertencias": (
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
              "Log de Crisis": (
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
        <h3 style={{ margin: 0, color: "#2c3e50" }}>Detalles de Fibra</h3>
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

      {loading && (
        <div style={{ textAlign: "center", padding: "10px", color: "#7f8c8d" }}>
          Cargando estado de la fibra...
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
  );
};

export default FibcabLeftPanel;
