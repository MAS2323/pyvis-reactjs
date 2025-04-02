import React, { useEffect, useRef } from "react";
import { useCesium } from "../../CesiumContext";
import {
  cesiumOptions,
  addTiandituLayers,
  flyToInitialPosition,
} from "../cesium/cesiumConfig";
import Toolbar from "../viewer/Toolbar";
import Footer from "../viewer/Footer";
import CameraInfo from "./CameraInfo";
import DeviceLayer from "../DeviceLayer";

const CesiumViewer = ({ onLogout }) => {
  const cesiumContainer = useRef(null);
  const { viewer, setViewer } = useCesium();

  useEffect(() => {
    if (!cesiumContainer.current) return;

    const viewerInstance = new Cesium.Viewer(
      cesiumContainer.current,
      cesiumOptions
    );
    addTiandituLayers(viewerInstance);
    flyToInitialPosition(viewerInstance);

    setViewer(viewerInstance);

    return () => {
      viewerInstance.destroy();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div ref={cesiumContainer} style={{ width: "100%", height: "100%" }} />
      {viewer && <DeviceLayer />}
      {viewer && <CameraInfo />}
      {viewer && <Toolbar viewer={viewer} />}
      {viewer && <Footer />}
      <button
        onClick={onLogout}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "1000",
          padding: "8px 16px",
          background: "#ff5722",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default CesiumViewer;
