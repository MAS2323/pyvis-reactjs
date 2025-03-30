// helpers/fibcabRenderer.js
export const renderFibcabConnections = (viewer, fibcabs, devices) => {
  viewer.entities.values
    .filter((e) => e.isFibcabConnection)
    .forEach((e) => viewer.entities.remove(e));

  const deviceMap = Object.fromEntries(
    devices.map((device) => [device.sn, device])
  );

  fibcabs.forEach((fibcab) => {
    const sourceDevice = deviceMap[fibcab.source_sn];
    const targetDevice = deviceMap[fibcab.target_sn];

    if (!sourceDevice || !targetDevice) return;

    const sourcePosition = Cesium.Cartesian3.fromDegrees(
      parseFloat(sourceDevice.longitude),
      parseFloat(sourceDevice.lattitude)
    );
    const targetPosition = Cesium.Cartesian3.fromDegrees(
      parseFloat(targetDevice.longitude),
      parseFloat(targetDevice.lattitude)
    );

    viewer.entities.add({
      name: `Conexión ${fibcab.sn}`,
      polyline: {
        positions: [sourcePosition, targetPosition],
        width: 5,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.2,
          color: Cesium.Color.CORNFLOWERBLUE.withAlpha(0.7),
        }),
        clampToGround: true,
        arcType: Cesium.ArcType.GEODESIC,
      },
      isFibcabConnection: true,
      data: fibcab,
    });
  });
};
