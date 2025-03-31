import React, { useEffect } from "react";
import { useCesium } from "../CesiumContext";
const ConnectionLayer = () => {
  const { viewer, nodes = [], connections = [] } = useCesium();

  useEffect(() => {
    if (!viewer || !viewer.entities || nodes.length === 0) return;

    // Limpiar conexiones anteriores
    viewer.entities.removeAll();

    // Dibujar nodos
    nodes.forEach((node) => {
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          parseFloat(node.longitude),
          parseFloat(node.latitude),
          0
        ),
        point: {
          pixelSize: 10,
          color: Cesium.Color.YELLOW,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
        data: node,
      });
    });

    // Dibujar conexiones
    connections.forEach((connection) => {
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      if (sourceNode && targetNode) {
        viewer.entities.add({
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
              sourceNode.longitude,
              sourceNode.latitude,
              0,
              targetNode.longitude,
              targetNode.latitude,
              0,
            ]),
            width: 2,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.2,
              color: Cesium.Color.CYAN,
            }),
            clampToGround: true,
          },
        });
      }
    });
  }, [viewer, nodes, connections]);

  return null;
};

export default ConnectionLayer;
