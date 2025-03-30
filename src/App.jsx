import React from "react";
import CesiumViewer from "./components/CesiumViewer";
import { CesiumProvider } from "./CesiumContext";
import "./App.css";
import Toolbar from "./components/Toolbar";
import Popup from "./components/Popup";
import FloatingButtons from "./components/FloatingButtons";

function App() {
  return (
    <div>
      <CesiumProvider>
        <CesiumViewer />
        <Toolbar />
        <Popup />
        <FloatingButtons />
      </CesiumProvider>
    </div>
  );
}

export default App;
