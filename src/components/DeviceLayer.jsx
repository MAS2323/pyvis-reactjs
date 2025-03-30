import React, { useEffect } from "react";
import { useCesium } from "../CesiumContext";
import {
  fetchAllDevices,
  fetchDevice,
  fetchFibcabsForDevice,
} from "../helpers/api";

const DeviceLayer = () => {
  const { viewer } = useCesium();

  useEffect(() => {
    if (!viewer) return;

    const loadDevices = async () => {
      try {
        const devices = await fetchAllDevices();

        for (const device of devices) {
          const deviceDetails = await fetchDevice(device.sn);
          const fibcabs = await fetchFibcabsForDevice(device.sn);

          viewer.entities.add({
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
            data: device,
          });
        }
      } catch (error) {
        console.error("Error loading devices:", error);
      }
    };

    loadDevices();
  }, [viewer]);

  return null;
};

const getDeviceColor = (type) => {
  const colors = {
    SDH: Cesium.Color.BLUE,
    Fibcab: Cesium.Color.RED,
    default: Cesium.Color.GREEN,
  };
  return colors[type] || colors.default;
};

export default DeviceLayer;
