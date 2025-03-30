import { useEffect } from "react";
import { fetchAllDevices } from "../../helpers/api";
import * as Cesium from "cesium";

export const useDeviceRenderer = (viewer, setSelectedEntity) => {
  useEffect(() => {
    if (!viewer) return;

    const loadDevices = async () => {
      try {
        const devices = await fetchAllDevices();

        devices.forEach((device) => {
          const entity = viewer.entities.add({
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
            data: { ...device, type: device.type.toLowerCase() },
          });
        });

        // Configurar evento de clic
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        handler.setInputAction((click) => {
          const pickedObject = viewer.scene.pick(click.position);
          if (Cesium.defined(pickedObject) && pickedObject.id?.data) {
            setSelectedEntity(pickedObject.id.data);
          } else {
            setSelectedEntity(null);
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        return () => {
          handler.destroy();
        };
      } catch (error) {
        console.error("Error loading devices:", error);
      }
    };

    loadDevices();
  }, [viewer, setSelectedEntity]);
};

const getDeviceColor = (type) => {
  const colors = {
    SDH: Cesium.Color.BLUE,
    Fibcab: Cesium.Color.RED,
    default: Cesium.Color.GREEN,
  };
  return colors[type] || colors.default;
};
