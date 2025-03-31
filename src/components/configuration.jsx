import axios from "axios";
import { apiEndpoints } from "../helpers/api"; // Ajusta la ruta según tu estructura

// Variable global para la entidad seleccionada (puedes usar useState o un store como Redux)
export const selectedEntity = { value: null };

// Referencia al viewer de Cesium (debes pasarla desde tu componente principal)
let viewer = null; // Actualiza esto con la referencia real de Cesium

// Configura el viewer desde tu componente principal
export const setCesiumViewer = (cesiumViewer) => {
  viewer = cesiumViewer;
};

// Función para mostrar información de un "cable" (fibcab)
async function showCableInfo(cableId) {
  try {
    // Obtener todos los fibcabs
    const cablesResponse = await axios.get(apiEndpoints.fibcabs);
    console.log("Datos de los fibcabs:", cablesResponse.data);

    // Filtrar el fibcab específico por su SN (equivalente a cableId)
    const selectedCable = cablesResponse.data.find(
      (cable) => cable.sn === cableId
    );
    if (!selectedCable) {
      throw new Error(`No se encontró ningún fibcab con SN ${cableId}`);
    }

    // Obtener "dispositivos IOLP" (usamos configuraciones como proxy)
    const iolpResponse = await axios
      .get(apiEndpoints.iolpDevices) // Podrías usar /dev-config/{sn} si tienes el SN
      .catch(() => ({ data: [] }));
    console.log("Configuraciones (IOLP):", iolpResponse.data);

    // Obtener "conexiones de fibra" (usamos estados como proxy)
    const fiberResponse = await axios
      .get(apiEndpoints.fiberConnections) // Podrías usar /dev-state/{sn}
      .catch(() => ({ data: [] }));
    console.log("Estados (fiber connections):", fiberResponse.data);

    // Construir el objeto de entidad seleccionada
    selectedEntity.value = {
      type: "cable",
      name: selectedCable.sn, // Usamos SN como nombre
      cables: [selectedCable],
      iolpDevices: iolpResponse.data || [],
      fiberConnections: fiberResponse.data || [],
    };

    console.log("Entidad seleccionada:", selectedEntity.value);
  } catch (error) {
    console.error("Error obteniendo información del fibcab:", error);
  }
}

// Función para mostrar información de un "nodo" (fibcab)
async function showNodeInfo(nodeId) {
  try {
    // Obtener información del fibcab por SN
    const nodeResponse = await axios.get(apiEndpoints.fibcabById(nodeId));
    const nodeData = nodeResponse.data;

    // Obtener configuraciones relacionadas (como IOLP devices)
    const iolpResponse = await axios
      .get(apiEndpoints.iolpDevices) // Podrías ajustar para /dev-config/{nodeId}
      .catch(() => ({ data: [] }));
    const iolpDevices = iolpResponse.data;

    // Obtener estados relacionados (como fiber connections)
    const fiberResponse = await axios
      .get(apiEndpoints.fiberConnections) // Podrías ajustar para /dev-state/{nodeId}
      .catch(() => ({ data: [] }));
    const fiberConnections = fiberResponse.data;

    // Guardar los datos en selectedEntity
    selectedEntity.value = {
      type: "node",
      ...nodeData,
      iolpDevices: iolpDevices || [],
      fiberConnections: fiberConnections || [],
    };
  } catch (error) {
    console.error("Error obteniendo información del nodo:", error);
  }
}

// Función para obtener y mostrar nodos y aristas
async function fetchNodeAndEdgeData() {
  try {
    // Obtener todos los fibcabs (nodos)
    const nodeResponse = await axios.get(apiEndpoints.fibcabs);
    const nodes = nodeResponse.data;

    // Crear un mapa de nodos
    const nodeMap = {};
    nodes.forEach((node) => {
      nodeMap[node.sn] = { latitude: node.latitude, longitude: node.longitude };
    });

    // Agregar nodos al mapa
    nodes.forEach((node) => {
      addMarkerToCesium(
        node.sn,
        node.sn, // Usamos SN como nombre
        node.latitude,
        node.longitude,
        `${node.sn}.png` // Ajusta si tienes íconos específicos
      );
    });

    // Obtener y dibujar aristas (conexiones entre fibcabs con el mismo device_sn)
    const processedDevices = new Set();
    for (const node of nodes) {
      if (processedDevices.has(node.device_sn)) continue;
      processedDevices.add(node.device_sn);

      const relatedNodes = await axios.get(
        apiEndpoints.fibcabsByDevice(node.device_sn)
      );
      const cables = relatedNodes.data;

      cables.forEach((cable, index) => {
        const nextCable = cables[index + 1];
        if (nextCable) {
          const sourceNode = nodeMap[cable.sn];
          const targetNode = nodeMap[nextCable.sn];
          if (sourceNode && targetNode) {
            addEdgeToCesium(sourceNode, targetNode);
          }
        }
      });
    }
  } catch (error) {
    console.error("Error al obtener nodos y aristas:", error);
  }
}

// Función para agregar una arista a Cesium
function addEdgeToCesium(sourceNode, targetNode) {
  if (!viewer) {
    console.error("Cesium viewer no está inicializado");
    return;
  }

  console.log(
    `Agregando arista: (${sourceNode.longitude}, ${sourceNode.latitude}) -> (${targetNode.longitude}, ${targetNode.latitude})`
  );

  const sourcePosition = Cesium.Cartesian3.fromDegrees(
    parseFloat(sourceNode.longitude),
    parseFloat(sourceNode.latitude)
  );
  const targetPosition = Cesium.Cartesian3.fromDegrees(
    parseFloat(targetNode.longitude),
    parseFloat(targetNode.latitude)
  );

  viewer.entities.add({
    polyline: {
      positions: [sourcePosition, targetPosition],
      width: 5,
      clampToGround: true,
      material: Cesium.Color.BLUE,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
  });
}

// Función para agregar un marcador a Cesium
function addMarkerToCesium(id, name, latitude, longitude, icon) {
  if (!viewer) {
    console.error("Cesium viewer no está inicializado");
    return;
  }

  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(
      parseFloat(longitude),
      parseFloat(latitude),
      1000
    ),
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 1,
    },
    label: {
      text: name,
      font: "14px sans-serif",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -20),
    },
    data: { id, name, type: "fibcab" },
  });
}

export { showCableInfo, showNodeInfo, fetchNodeAndEdgeData, addEdgeToCesium };
