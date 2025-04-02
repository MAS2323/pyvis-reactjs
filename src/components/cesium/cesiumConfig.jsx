// Configuración de Tianditu
const token = "ac3385d7bfe8301140eb2c35b0e415ee"; // Token de Tianditu
const tdtUrl = "https://t{s}.tianditu.gov.cn/";
const subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];

// Función para crear un proveedor de imágenes de Tianditu
export const createImageryProvider = (layerType) => {
  return new Cesium.UrlTemplateImageryProvider({
    url: `${tdtUrl}DataServer?T=${layerType}&x={x}&y={y}&l={z}&tk=${token}`,
    subdomains: subdomains,
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    maximumLevel: 18,
  });
};

// Configuración del terreno básico
export const terrainProvider = new Cesium.EllipsoidTerrainProvider();

// Configuración de las capas de Tianditu
export const cesiumOptions = {
  // imageryProvider: createImageryProvider("img_w"), // Capa base de imágenes satelitales
  terrainProvider: terrainProvider, // Terreno básico
  infoBox: false,
  selectionIndicator: false,
  animation: false,
  timeline: false,
  geocoder: true,
  baseLayerPicker: false, // Desactivar el selector de capas base
  creditContainer: document.createElement("div"), // Ocultar créditos
};

// Función para agregar capas adicionales al visor
export const addTiandituLayers = (viewer) => {
  const imageProviderUno = createImageryProvider("img_w");
  const imageProviderDos = createImageryProvider("cia_w");
  const imageProviderTres = createImageryProvider("ibo_w");

  // Añadir las capas adicionales al visor
  viewer.imageryLayers.addImageryProvider(imageProviderUno); // Anotaciones en chino
  viewer.imageryLayers.addImageryProvider(imageProviderDos); // Anotaciones en chino
  viewer.imageryLayers.addImageryProvider(imageProviderTres); // Anotaciones en inglés

  // Establecer la opacidad de las capas adicionales
  viewer.imageryLayers.get(1).alpha = 0.8; // Opacidad para la capa de anotaciones en chino
  viewer.imageryLayers.get(2).alpha = 0.8; // Opacidad para la capa de anotaciones en inglés
  // Configuración de la cámara
  // viewer.scene.screenSpaceCameraController.zoomFactor = 1.1; // Controla la velocidad del zoom
  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 500; // Mínimo zoom (en metros)
  viewer.scene.screenSpaceCameraController.maximumZoomDistance = 5000000; // Máximo zoom (en metros)
};

// Función para realizar el vuelo inicial de la cámara
export const flyToInitialPosition = (viewer) => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(105.0, 35.0, 2000000),
    duration: 3, // Tiempo en segundos
  });
};
