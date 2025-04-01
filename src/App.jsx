import React from "react";
import CesiumViewer from "./components/CesiumViewer";
import { CesiumProvider } from "./CesiumContext";
import "./App.css";
import Toolbar from "./components/Toolbar";
import FloatingButtons from "./components/FloatingButtons";
import GlobalBottleneckMonitor from "./components/GlobalBottleneckMonitor";

function App() {
  return (
    <div>
      <CesiumProvider>
        <CesiumViewer />
        <Toolbar />
        <FloatingButtons />
        <GlobalBottleneckMonitor />
      </CesiumProvider>
    </div>
  );
}

export default App;
