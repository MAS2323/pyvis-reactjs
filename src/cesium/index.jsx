import React, { useRef, useState } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import Toolbar from "../Toolbar";
import Footer from "../Footer";
import { useCesiumSetup } from "./useCesiumSetup";
import { useDeviceRenderer } from "./useDeviceRenderer";
import DevicePopup from "../Popups/DevicePopup";
import FibcabPopup from "../Popups/FibcabPopup";
import SdhPopup from "../Popups/SdhPopup";
import "../styles/popups.css";

const CesiumViewer = () => {
  const cesiumContainer = useRef(null);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const { viewer, cameraInfo } = useCesiumSetup(cesiumContainer);

  useDeviceRenderer(viewer, setSelectedEntity);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div ref={cesiumContainer} style={{ width: "100%", height: "100%" }} />

      {viewer && <Toolbar viewer={viewer} />}
      {viewer && <Footer cameraInfo={cameraInfo} />}

      {/* Popups */}
      <DevicePopup
        entity={selectedEntity?.type === "device" ? selectedEntity : null}
        onClose={() => setSelectedEntity(null)}
      />
      <FibcabPopup
        entity={selectedEntity?.type === "fibcab" ? selectedEntity : null}
        onClose={() => setSelectedEntity(null)}
      />
      <SdhPopup
        entity={selectedEntity?.type === "sdh" ? selectedEntity : null}
        onClose={() => setSelectedEntity(null)}
      />
    </div>
  );
};

export default CesiumViewer;
