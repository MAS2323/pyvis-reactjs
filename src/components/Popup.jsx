import React, { useState } from "react";

const Popup = () => {
  const [visible, setVisible] = useState(true);

  return visible ? (
    <div className="popup">
      <p>Find and manage all your projects in Cesium.</p>
      <button onClick={() => setVisible(false)}>Dismiss</button>
    </div>
  ) : null;
};

export default Popup;
