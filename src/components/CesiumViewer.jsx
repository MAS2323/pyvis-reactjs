import React, { useEffect, useRef, useState } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import Footer from "./Footer";
import Toolbar from "./Toolbar";
import {
  cesiumOptions,
  addTiandituLayers,
  flyToInitialPosition,
} from "./cesiumConfig";
import {
  fetchAllDevices,
  fetchDevice,
  fetchFibcab,
  fetchFibcabsForDevice,
} from "../helpers/api";

const CesiumViewer = () => {
  const cesiumContainer = useRef(null);
  const [viewer, setViewer] = useState(null);
  const [cameraInfo, setCameraInfo] = useState({
    height: "Loading...",
    coords: "Loading...",
  });

  useEffect(() => {
    const initCesium = async () => {
      const viewerInstance = new Cesium.Viewer(
        cesiumContainer.current,
        cesiumOptions
      );
      addTiandituLayers(viewerInstance);
      flyToInitialPosition(viewerInstance);

      // Cargar y mostrar dispositivos
      try {
        const devices = await fetchAllDevices();

        // Renderizar cada dispositivo
        for (const device of devices) {
          // Solo pasar el SN, no el objeto completo
          const deviceDetails = await fetchDevice(device.sn);
          const fibcabs = await fetchFibcabsForDevice(device.sn);

          // Crear entidad en Cesium
          viewerInstance.entities.add({
            position: Cesium.Cartesian3.fromDegrees(
              parseFloat(device.longitude),
              parseFloat(device.lattitude),
              1000
            ),
            point: {
              pixelSize: 10,
              color: getDeviceColor(device.type),
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
            label: {
              text: device.name,
              font: "14px sans-serif",
              fillColor: Cesium.Color.WHITE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 2,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -20),
              disableDepthTestDistance: Number.POSITIVE_INFINITY,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
            data: device, // Guardar datos completos para el popup
          });
        }
      } catch (error) {
        console.error("Error loading devices:", error);
      }

      // Configurar la actualización de la cámara
      const updateCameraData = () => {
        try {
          const cameraPosition = viewerInstance.camera.positionCartographic;
          if (!cameraPosition) return;

          const longitude = Cesium.Math.toDegrees(
            cameraPosition.longitude
          ).toFixed(6);
          const latitude = Cesium.Math.toDegrees(
            cameraPosition.latitude
          ).toFixed(6);
          const height = (cameraPosition.height / 1000).toFixed(2);

          setCameraInfo({
            height: `Altura: ${height} km`,
            coords: `Latitud: ${latitude}°N, Longitud: ${longitude}°E`,
          });
        } catch (error) {
          console.error("Error updating camera info:", error);
          setCameraInfo({
            height: "Error loading height",
            coords: "Error loading coordinates",
          });
        }
      };

      viewerInstance.camera.moveEnd.addEventListener(updateCameraData);
      updateCameraData();

      setViewer(viewerInstance);

      return () => {
        viewerInstance.destroy();
      };
    };

    initCesium();

    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div ref={cesiumContainer} style={{ width: "100%", height: "100%" }} />
      {viewer && <Toolbar viewer={viewer} />}
      {viewer && <Footer cameraInfo={cameraInfo} />}
    </div>
  );
};

const getDeviceColor = (type) => {
  const colors = {
    SDH: Cesium.Color.BLUE,
    Fibcab: Cesium.Color.RED,
    default: Cesium.Color.GREEN,
  };
  return colors[type] || colors.default;
};

export default CesiumViewer;
