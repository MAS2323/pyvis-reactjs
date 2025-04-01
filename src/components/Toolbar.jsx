import React, { useState } from "react";
import { useCesium } from "../CesiumContext";

const Toolbar = () => {
  const { viewer } = useCesium();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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
        <button className="header-menu-item">File</button>
        <button className="header-menu-item">View</button>
        <button className="header-menu-item">Add</button>
        <button className="header-menu-item">Tools</button>
        <button className="header-menu-item">Help</button>
      </div>
    </header>
  );
};

export default Toolbar;
