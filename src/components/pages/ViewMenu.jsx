import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import NetworkGraph from "./NetworkGraph";
import {
  fetchProcessedData,
  fetchDevicesGeoJSON,
  fetchNetworkGeoJSON,
  fetchCesiumConfig,
} from "../../helpers/api";
import "./styles/ViewMenu.css";

export default function ViewMenu({ closeMenu }) {
  const [activeTab, setActiveTab] = useState("devices");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    processedData: null,
    devices: null,
    network: null,
    cesiumConfig: null,
    graphData: null,
  });

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [processedData, devices, network, cesiumConfig] = await Promise.all(
        [
          fetchProcessedData(),
          fetchDevicesGeoJSON(),
          fetchNetworkGeoJSON(),
          fetchCesiumConfig(),
        ]
      );

      const graphData = processDataForVisualization(devices, network);

      setData({
        processedData,
        devices,
        network,
        cesiumConfig,
        graphData,
      });
    } catch (error) {
      console.error("Error loading visualization data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processDataForVisualization = (devices, network) => {
    const deviceTypes = {};
    devices?.features?.forEach((device) => {
      const type = device.properties?.type || "Desconocido";
      deviceTypes[type] = (deviceTypes[type] || 0) + 1;
    });

    return {
      deviceTypes,
    };
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const renderTabContent = () => {
    if (isLoading) {
      return <div className="loading-spinner">Cargando datos...</div>;
    }

    switch (activeTab) {
      case "devices":
        return (
          <div className="tab-content">
            <h3>Dispositivos</h3>
            <p>Total dispositivos: {data.devices?.features?.length || 0}</p>
            {data.graphData?.deviceTypes && (
              <div className="interactive-chart">
                <Plot
                  data={[
                    {
                      values: Object.values(data.graphData.deviceTypes),
                      labels: Object.keys(data.graphData.deviceTypes),
                      type: "pie",
                      hoverinfo: "label+percent",
                      textinfo: "value",
                    },
                  ]}
                  layout={{
                    title: "Distribución de Dispositivos por Tipo",
                    height: 300,
                    width: "auto", // Se ajustará al contenedor
                  }}
                />
              </div>
            )}
          </div>
        );
      case "network":
        return (
          <div className="tab-content">
            <h3>Red Fibcab</h3>
            <p>Total conexiones: {data.network?.features?.length || 0}</p>
            {data.network && (
              <div className="interactive-chart">
                <NetworkGraph networkData={data.network} />
              </div>
            )}
          </div>
        );
      case "combined":
        return (
          <div className="tab-content">
            <h3>Vista Combinada</h3>
            <p>Configuración Cesium cargada</p>
            <button className="visualize-button">Visualizar en Cesium</button>
          </div>
        );
      case "processed":
        return (
          <div className="tab-content">
            <h3>Datos Procesados</h3>
            {data.processedData && (
              <div className="interactive-chart">
                <Plot
                  data={[
                    {
                      type: "bar",
                      x: Object.keys(data.processedData),
                      y: Object.values(data.processedData),
                      marker: { color: "#0066cc" },
                    },
                  ]}
                  layout={{
                    title: "Datos Procesados",
                    height: 300,
                    width: "auto",
                  }}
                />
              </div>
            )}
          </div>
        );
      default:
        return <div>Seleccione una vista</div>;
    }
  };

  return (
    <>
      <div className="tabs">
        <button
          className={activeTab === "devices" ? "active" : ""}
          onClick={() => setActiveTab("devices")}
        >
          Dispositivos
        </button>
        <button
          className={activeTab === "network" ? "active" : ""}
          onClick={() => setActiveTab("network")}
        >
          Red
        </button>
        <button
          className={activeTab === "combined" ? "active" : ""}
          onClick={() => setActiveTab("combined")}
        >
          Vista 3D
        </button>
        <button
          className={activeTab === "processed" ? "active" : ""}
          onClick={() => setActiveTab("processed")}
        >
          Datos Procesados
        </button>
      </div>
      <div className="content-container">{renderTabContent()}</div>
    </>
  );
}
