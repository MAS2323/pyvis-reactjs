import React from "react";
import HealthIndicator from "./HealthIndicator";

const DevicePopup = ({ entity, details, onClose }) => {
  const device = details || entity.data;

  return (
    <div className="cesium-popup">
      <div className="popup-content device-popup">
        <div className="popup-header">
          <h3>{device.name || device.sn}</h3>
          <button onClick={onClose} className="close-btn">
            ×
          </button>
        </div>

        <div className="popup-body">
          <div className="health-status">
            <HealthIndicator status={device.healthStatus} />
            <span className="health-value">
              {device.health_point || "N/A"} / 100
            </span>
          </div>

          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">SN:</span>
              <span className="info-value">{device.sn}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Ubicación:</span>
              <span className="info-value">{device.location || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Ciudad:</span>
              <span className="info-value">{device.city || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Productor:</span>
              <span className="info-value">{device.Producer || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Coordenadas:</span>
              <span className="info-value">
                {device.longitude}, {device.lattitude}
              </span>
            </div>
          </div>

          <div className="metrics-section">
            <h4>Métricas Ópticas</h4>
            <div className="metrics-grid">
              <div className="metric">
                <span>Potencia media:</span>
                <span>{device.opt_pow_mean || "N/A"} dBm</span>
              </div>
              <div className="metric">
                <span>Máxima:</span>
                <span>{device.opt_pow_max || "N/A"} dBm</span>
              </div>
              <div className="metric">
                <span>Mínima:</span>
                <span>{device.opt_pow_min || "N/A"} dBm</span>
              </div>
              <div className="metric">
                <span>Variación:</span>
                <span>{device.opt_pow_var || "N/A"} dBm</span>
              </div>
            </div>
          </div>

          <div className="log-links">
            <a
              href={device.warnlog_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver logs de advertencia
            </a>
            <a
              href={device.crislog_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver logs de crisis
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePopup;
