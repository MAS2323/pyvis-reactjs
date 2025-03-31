import { useState } from "react";
import NodePopup from "./NodePopup";
import FibcabPopup from "./FibcabPopup";

export const usePopupManager = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [showFibcab, setShowFibcab] = useState(false);

  const handleEntityClick = (device, position) => {
    if (device) {
      setSelectedDevice(device);
      setClickPosition(position);
      setShowFibcab(device.type === "Fibcab");
    } else {
      setSelectedDevice(null);
      setShowFibcab(false);
    }
  };

  const PopupComponents = () => (
    <>
      <NodePopup
        device={selectedDevice}
        position={clickPosition}
        onClose={() => setSelectedDevice(null)}
      />

      {showFibcab && selectedDevice && (
        <FibcabPopup
          deviceSn={selectedDevice.sn}
          onClose={() => setShowFibcab(false)}
        />
      )}
    </>
  );

  return { handleEntityClick, PopupComponents };
};
