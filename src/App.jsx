import React from "react";
import CesiumViewer from "./components/CesiumViewer";
import "./App.css"; // Importa el archivo CSS
import Toolbar from "./components/Toolbar";
import Popup from "./components/Popup";
import FloatingButtons from "./components/FloatingButtons";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <CesiumViewer />
      <Toolbar />
      <Popup />
      <FloatingButtons />
    </div>
  );
}

export default App;
