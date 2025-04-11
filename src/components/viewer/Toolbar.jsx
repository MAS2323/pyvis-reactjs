import React, { useState, useRef, useEffect } from "react";
import { useCesium } from "../../CesiumContext";
import FileMenu from "../pages/FileMenu";
import ViewMenu from "../pages/ViewMenu";
import AddMenu from "../pages/AddMenu";
import ToolsMenu from "../pages/ToolsMenu";
import HelpMenu from "../pages/HelpMenu";
import "./styles/Toolbar.css";

const Toolbar = () => {
  const { viewer } = useCesium();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const toolbarRef = useRef(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!viewer || !searchTerm.trim()) return;
    // ... (tu lógica de búsqueda)
  };

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const renderMenu = () => {
    const menus = {
      file: <FileMenu closeMenu={() => setActiveMenu(null)} />,
      view: <ViewMenu closeMenu={() => setActiveMenu(null)} />,
      add: <AddMenu closeMenu={() => setActiveMenu(null)} />,
      tools: <ToolsMenu closeMenu={() => setActiveMenu(null)} />,
      help: <HelpMenu closeMenu={() => setActiveMenu(null)} />,
    };
    return menus[activeMenu] || null;
  };

  return (
    <div className="toolbar-container" ref={toolbarRef}>
      <div className="toolbar-title">
        基于PyViz的智能光SDH数字孪生前端技术研究
      </div>

      <div className="toolbar-search-container">
        <form className="toolbar-search" onSubmit={handleSearch}>
          <button type="submit" aria-label="Buscar">
            <i className="fas fa-search" />
          </button>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      <div className="toolbar-menu">
        {["file", "view", "add", "tools", "help"].map((menu) => (
          <button key={menu} onClick={() => toggleMenu(menu)}>
            {menu.charAt(0).toUpperCase() + menu.slice(1)}
          </button>
        ))}
      </div>

      <div className={`toolbar-dropdown ${activeMenu ? "active" : ""}`}>
        {renderMenu()}
      </div>
    </div>
  );
};

export default Toolbar;
