import React, { useEffect, useState } from "react";
import {
  fetchIolpInfo,
  fetchIolpConfig,
  fetchIolpState,
} from "../../helpers/api";

const LeftPanel = ({ data, onClose }) => {
  const [iolpData, setIolpData] = useState({
    info: null,
    config: null,
    state: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data?.sn) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [info, config, state] = await Promise.all([
          fetchIolpInfo(data.sn),
          fetchIolpConfig(data.sn),
          fetchIolpState(data.sn),
        ]);
        setIolpData({ info, config, state });
      } catch (error) {
        console.error("Error fetching IOLP data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data?.sn]);

  const renderIolpSection = () => {
    if (!iolpData.info && !iolpData.config && !iolpData.state) return null;

    return (
      <div style={{ marginBottom: "20px" }}>
        <h4
          style={{
            margin: "0 0 10px 0",
            color: "#3498db",
            fontSize: "1rem",
          }}
        >
          Información IOLP
        </h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          {/* Información básica */}
          <div
            style={{ fontWeight: "bold", color: "#7f8c8d", fontSize: "0.9rem" }}
          >
            Tag ID:
          </div>
          <div style={{ wordBreak: "break-word", fontSize: "0.9rem" }}>
            {iolpData.info?.tagId || "N/A"}
          </div>

          {/* Configuración */}
          <div
            style={{ fontWeight: "bold", color: "#7f8c8d", fontSize: "0.9rem" }}
          >
            Pares Activos:
          </div>
          <div style={{ wordBreak: "break-word", fontSize: "0.9rem" }}>
            {iolpData.config?.actived_pairs || "N/A"}
          </div>

          <div
            style={{ fontWeight: "bold", color: "#7f8c8d", fontSize: "0.9rem" }}
          >
            Pares Inactivos:
          </div>
          <div style={{ wordBreak: "break-word", fontSize: "0.9rem" }}>
            {iolpData.config?.inactived_pairs || "N/A"}
          </div>

          {/* Estado */}
          <div
            style={{ fontWeight: "bold", color: "#7f8c8d", fontSize: "0.9rem" }}
          >
            Punto de Salud:
          </div>
          <div style={{ wordBreak: "break-word", fontSize: "0.9rem" }}>
            {iolpData.state?.health_point !== undefined
              ? `${iolpData.state.health_point}%`
              : "N/A"}
          </div>

          <div
            style={{ fontWeight: "bold", color: "#7f8c8d", fontSize: "0.9rem" }}
          >
            Potencia Media:
          </div>
          <div style={{ wordBreak: "break-word", fontSize: "0.9rem" }}>
            {iolpData.state?.opt_pow_mean !== undefined
              ? `${iolpData.state.opt_pow_mean} dBm`
              : "N/A"}
          </div>

          {/* Enlaces */}
          {iolpData.state?.warnlog_url && (
            <>
              <div
                style={{
                  fontWeight: "bold",
                  color: "#7f8c8d",
                  fontSize: "0.9rem",
                }}
              >
                Log Advertencias:
              </div>
              <div style={{ wordBreak: "break-word", fontSize: "0.9rem" }}>
                <a
                  href={iolpData.state.warnlog_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

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
          Detalles IOLP - {data?.sn || ""}
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

      <hr style={{ margin: "10px 0", borderColor: "#eee" }} />

      {loading && (
        <div style={{ textAlign: "center", padding: "10px", color: "#7f8c8d" }}>
          Cargando información IOLP...
        </div>
      )}

      {renderIolpSection()}
    </div>
  );
};

export default LeftPanel;
