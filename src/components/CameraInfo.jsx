import React, { useEffect, useState } from "react";
import { useCesium } from "../CesiumContext";

const CameraInfo = () => {
  const { viewer } = useCesium();
  const [cameraInfo, setCameraInfo] = useState({
    height: "Loading...",
    coords: "Loading...",
  });

  useEffect(() => {
    if (!viewer) return;

    const updateCameraData = () => {
      try {
        const cameraPosition = viewer.camera.positionCartographic;
        if (!cameraPosition) return;

        const longitude = Cesium.Math.toDegrees(
          cameraPosition.longitude
        ).toFixed(6);
        const latitude = Cesium.Math.toDegrees(cameraPosition.latitude).toFixed(
          6
        );
        const height = (cameraPosition.height / 1000).toFixed(2);

        setCameraInfo({
          height: `Altura: ${height} km`,
          coords: `Latitud: ${latitude}°N, Longitud: ${longitude}°E`,
        });
      } catch (error) {
        console.error("Error updating camera info:", error);
      }
    };

    viewer.camera.moveEnd.addEventListener(updateCameraData);
    updateCameraData();

    return () => {
      viewer.camera.moveEnd.removeEventListener(updateCameraData);
    };
  }, [viewer]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        background: "rgba(0,0,0,0.5)",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <p>{cameraInfo.height}</p>
      <p>{cameraInfo.coords}</p>
    </div>
  );
};

export default CameraInfo;
