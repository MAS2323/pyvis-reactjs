import React, { useState, useEffect, useRef } from "react";
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
  const [chartTypeDevices, setChartTypeDevices] = useState("pie");
  const [chartTypeProcessed, setChartTypeProcessed] = useState("bar");
  const [dimensions, setDimensions] = useState({ width: 500, height: 400 }); // Initial dimensions
  const [isResizing, setIsResizing] = useState(false);
  const popupRef = useRef(null);

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

  // Handle resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const newWidth =
        e.clientX - popupRef.current.getBoundingClientRect().left;
      const newHeight =
        e.clientY - popupRef.current.getBoundingClientRect().top;

      // Enforce minimum and maximum dimensions
      const minWidth = 300;
      const maxWidth = window.innerWidth * 0.9; // 90% of viewport width
      const minHeight = 200;
      const maxHeight = window.innerHeight * 0.8; // 80% of viewport height

      setDimensions({
        width: Math.max(minWidth, Math.min(newWidth, maxWidth)),
        height: Math.max(minHeight, Math.min(newHeight, maxHeight)),
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const renderTabContent = () => {
    if (isLoading) {
      return <div className="loading-spinner">Loading data...</div>;
    }

    switch (activeTab) {
      case "devices":
        return (
          <div className="tab-content">
            <div className="section">
              <h3>Devices</h3>
              <p>Total devices: {data.devices?.features?.length || 0}</p>
              {data.graphData?.deviceTypes && (
                <>
                  <div className="chart-type-selector">
                    <label htmlFor="chart-type-devices">Chart Type:</label>
                    <select
                      id="chart-type-devices"
                      value={chartTypeDevices}
                      onChange={(e) => setChartTypeDevices(e.target.value)}
                    >
                      <option value="pie">Pie</option>
                      <option value="bar">Bar</option>
                      <option value="line">Line</option>
                      <option value="scatter">Scatter</option>
                    </select>
                  </div>
                  <div className="interactive-chart">
                    <Plot
                      data={[
                        {
                          values: Object.values(data.graphData.deviceTypes),
                          labels: Object.keys(data.graphData.deviceTypes),
                          type: chartTypeDevices,
                          hoverinfo: "label+percent",
                          textinfo:
                            chartTypeDevices === "pie" ? "value" : undefined,
                          marker: { color: "#0066cc" },
                        },
                      ]}
                      layout={{
                        title: "Device Type Distribution",
                        height: dimensions.height - 150, // Adjust chart height based on popup height
                        width: "auto",
                        margin: { t: 40, b: 40, l: 40, r: 40 },
                        paper_bgcolor: "rgba(0,0,0,0)",
                        plot_bgcolor: "rgba(0,0,0,0)",
                        font: { color: "#eee" },
                      }}
                      useResizeHandler={true}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case "network":
        return (
          <div className="tab-content">
            <div className="section">
              <h3>Fibcabs</h3>
              <p>Total connections: {data.network?.features?.length || 0}</p>
              {data.network && (
                <div className="interactive-chart">
                  <NetworkGraph networkData={data.network} />
                </div>
              )}
            </div>
          </div>
        );
      case "combined":
        return (
          <div className="tab-content">
            <div className="section">
              <h3>Combined View</h3>
              <p>Cesium configuration loaded.</p>
              <button className="action-button">Visualize in Cesium</button>
            </div>
          </div>
        );
      case "processed":
        return (
          <div className="tab-content">
            <div className="section">
              <h3>Processed Data</h3>
              {data.processedData && (
                <>
                  <div className="chart-type-selector">
                    <label htmlFor="chart-type-processed">Chart Type:</label>
                    <select
                      id="chart-type-processed"
                      value={chartTypeProcessed}
                      onChange={(e) => setChartTypeProcessed(e.target.value)}
                    >
                      <option value="bar">Bar</option>
                      <option value="line">Line</option>
                      <option value="scatter">Scatter</option>
                      <option value="area">Area</option>
                    </select>
                  </div>
                  <div className="interactive-chart">
                    <Plot
                      data={[
                        {
                          type: chartTypeProcessed,
                          x: Object.keys(data.processedData),
                          y: Object.values(data.processedData),
                          marker: { color: "#0066cc" },
                          fill:
                            chartTypeProcessed === "area" ? "tozeroy" : "none",
                        },
                      ]}
                      layout={{
                        title: "Processed Data",
                        height: dimensions.height - 150, // Adjust chart height based on popup height
                        width: "auto",
                        margin: { t: 40, b: 40, l: 40, r: 40 },
                        paper_bgcolor: "rgba(0,0,0,0)",
                        plot_bgcolor: "rgba(0,0,0,0)",
                        font: { color: "#eee" },
                      }}
                      useResizeHandler={true}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );
      default:
        return <div>Select a view</div>;
    }
  };

  const handleReset = () => {
    setChartTypeDevices("pie");
    setChartTypeProcessed("bar");
    setActiveTab("devices");
    setDimensions({ width: 500, height: 400 }); // Reset dimensions
  };

  return (
    <div
      className="view-menu"
      ref={popupRef}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
    >
      <div className="view-menu-header">
        <h2>View Settings</h2>
        <button className="close-button" onClick={closeMenu} aria-label="Close">
          ×
        </button>
      </div>
      <div className="tabs">
        <button
          className={activeTab === "devices" ? "active" : ""}
          onClick={() => setActiveTab("devices")}
        >
          Devices
        </button>
        <button
          className={activeTab === "network" ? "active" : ""}
          onClick={() => setActiveTab("network")}
        >
          Fibcab
        </button>
        <button
          className={activeTab === "combined" ? "active" : ""}
          onClick={() => setActiveTab("combined")}
        >
          IOLP
        </button>
        <button
          className={activeTab === "processed" ? "active" : ""}
          onClick={() => setActiveTab("processed")}
        >
          JMPMAT
        </button>
      </div>
      <div className="content-container">{renderTabContent()}</div>
      <div className="view-menu-footer">
        <button className="footer-button secondary" onClick={handleReset}>
          Reset to defaults
        </button>
        <button className="footer-button primary" onClick={closeMenu}>
          Done
        </button>
      </div>
      <div className="resize-handle" onMouseDown={handleMouseDown}></div>
    </div>
  );
}
