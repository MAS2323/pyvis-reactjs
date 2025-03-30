export const initCesium = async (
  viewer,
  setAllDevices,
  setAllFibcabs,
  setSelectedDevice,
  setDeviceFibcabs,
  setCameraInfo,
  setViewer
) => {
  addTiandituLayers(viewer);
  flyToInitialPosition(viewer);

  try {
    const devices = await fetchAllDevices();
    setAllDevices(devices);

    const deviceEntitiesPromises = devices.map(async (device) => {
      const deviceDetails = await fetchDevice(device.sn);
      const fibcabs = await fetchFibcabsForDevice(device.sn);

      // Aquí es donde obtienes la información del nodo
      const nodeDetails = await fetchNodeForDevice(device.sn); // Necesitarás esta función

      return viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          parseFloat(device.longitude),
          parseFloat(device.lattitude),
          1000
        ),
        point: {
          pixelSize: 10,
          color: Cesium.Color.YELLOW,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
        label: {
          text: device.name,
          font: "14px sans-serif",
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
        data: {
          device, // Incluye el dispositivo
          nodeDetails, // Aquí guardas los detalles del nodo
          fibcabs, // Aquí se guardan los fibcabs
        },
      });
    });

    await Promise.all(deviceEntitiesPromises);

    const allFibcabsData = [];
    for (const device of devices) {
      const fibcabs = await fetchFibcabsForDevice(device.sn);
      allFibcabsData.push(...fibcabs);
    }
    setAllFibcabs(allFibcabsData);

    renderFibcabConnections(viewer, allFibcabsData, devices);

    setViewer(viewer);
  } catch (error) {
    console.error("Error initializing Cesium:", error);
  }
};
