import React, { useEffect, useRef } from "react";
import { useCesium } from "../CesiumContext";
import {
  cesiumOptions,
  addTiandituLayers,
  flyToInitialPosition,
} from "../components/cesiumConfig";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import CameraInfo from "./CameraInfo";
import DeviceLayer from "./DeviceLayer";

const CesiumViewer = () => {
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
    </div>
  );
};

export default CesiumViewer;
