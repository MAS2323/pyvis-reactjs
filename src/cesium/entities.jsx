export const createDeviceEntity = (device, viewer) => {
  return viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(
      parseFloat(device.longitude),
      parseFloat(device.latitude), // Nota: corregí "lattitude" a "latitude"
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
    data: { type: "node", ...device },
  });
};

export const createFiberEdge = (source, target, fibcabData, viewer) => {
  return viewer.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        parseFloat(source.longitude),
        parseFloat(source.latitude),
        parseFloat(target.longitude),
        parseFloat(target.latitude),
      ]),
      width: 2,
      material: Cesium.Color.YELLOW,
      clampToGround: true,
    },
    data: { type: "fibcab", ...fibcabData, source, target },
  });
};

export const getDeviceColor = (type) => {
  const colors = {
    SDH: Cesium.Color.BLUE,
    Fibcab: Cesium.Color.RED,
    default: Cesium.Color.GREEN,
  };
  return colors[type] || colors.default;
};
