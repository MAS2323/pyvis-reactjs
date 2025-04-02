import React, { useState } from "react";
import { useCesium } from "../../CesiumContext";
import FileMenu from "../pages/FileMenu";
import ViewMenu from "../pages/ViewMenu";
import AddMenu from "../pages/AddMenu";
import ToolsMenu from "../pages/ToolsMenu";
import HelpMenu from "../pages/HelpMenu";

const Toolbar = () => {
  const { viewer } = useCesium();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!viewer || !searchTerm.trim()) return;

    setIsSearching(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchTerm
        )}`
      );
      const results = await response.json();

      if (results.length > 0) {
        const firstResult = results[0];
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            parseFloat(firstResult.lon),
            parseFloat(firstResult.lat),
            10000
          ),
          duration: 1.5,
        });
      }
    } finally {
      setIsSearching(false);
    }
  };

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const renderMenuContent = () => {
    switch (activeMenu) {
      case "file":
        return <FileMenu />;
      case "view":
        return <ViewMenu />;
      case "add":
        return <AddMenu />;
      case "tools":
        return <ToolsMenu />;
      case "help":
        return <HelpMenu />;
      default:
        return null;
    }
  };

  return (
    <header className="app-header">
      <div className="header-title">
        基于PyViz的智能光SDH数字孪生前端技术研究
      </div>

      <div className="search-container-wrapper">
        <form onSubmit={handleSearch} className="search-container">
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isSearching}
          />
        </form>
      </div>

      <div className="header-menu">
        <button
          className={`header-menu-item ${
            activeMenu === "file" ? "active" : ""
          }`}
          onClick={() => toggleMenu("file")}
        >
          File
        </button>
        <button
          className={`header-menu-item ${
            activeMenu === "view" ? "active" : ""
          }`}
          onClick={() => toggleMenu("view")}
        >
          View
        </button>
        <button
          className={`header-menu-item ${activeMenu === "add" ? "active" : ""}`}
          onClick={() => toggleMenu("add")}
        >
          Add
        </button>
        <button
          className={`header-menu-item ${
            activeMenu === "tools" ? "active" : ""
          }`}
          onClick={() => toggleMenu("tools")}
        >
          Tools
        </button>
        <button
          className={`header-menu-item ${
            activeMenu === "help" ? "active" : ""
          }`}
          onClick={() => toggleMenu("help")}
        >
          Help
        </button>
      </div>

      {/* Renderiza el contenido del menú activo */}
      {activeMenu && <div className="menu-dropdown">{renderMenuContent()}</div>}
    </header>
  );
};

export default Toolbar;
