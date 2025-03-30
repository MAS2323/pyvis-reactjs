import { useEffect, useState } from "react";
import {
  cesiumOptions,
  addTiandituLayers,
  flyToInitialPosition,
} from "../components/cesiumConfig";

export const useCesiumSetup = (containerRef) => {
  const [viewer, setViewer] = useState(null);
  const [cameraInfo, setCameraInfo] = useState({
    height: "Loading...",
    coords: "Loading...",
  });

  useEffect(() => {
    const init = async () => {
      const viewerInstance = new Cesium.Viewer(
        containerRef.current,
        cesiumOptions
      );
      addTiandituLayers(viewerInstance);
      flyToInitialPosition(viewerInstance);

      // Configurar seguimiento de cámara
      const updateCameraData = () => {
        const position = viewerInstance.camera.positionCartographic;
        if (!position) return;

        setCameraInfo({
          height: `Altura: ${(position.height / 1000).toFixed(2)} km`,
          coords: `Latitud: ${Cesium.Math.toDegrees(position.latitude).toFixed(
            6
          )}°N, Longitud: ${Cesium.Math.toDegrees(position.longitude).toFixed(
            6
          )}°E`,
        });
      };

      viewerInstance.camera.moveEnd.addEventListener(updateCameraData);
      updateCameraData();

      setViewer(viewerInstance);

      return () => {
        viewerInstance.destroy();
      };
    };

    init();
  }, [containerRef]);

  return { viewer, cameraInfo };
};
