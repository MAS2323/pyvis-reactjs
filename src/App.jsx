import React from "react";
import CesiumViewer from "./components/cesium/CesiumViewer";
import { CesiumProvider } from "./CesiumContext";
import "./App.css";

function App() {
  return (
    <div>
      <CesiumProvider>
        <CesiumViewer />
      </CesiumProvider>
    </div>
  );
}

export default App;
