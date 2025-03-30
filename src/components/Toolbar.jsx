import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Toolbar = ({ viewer }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [geocoder, setGeocoder] = useState(null);

  useEffect(() => {
    if (!viewer) return;

    // Inicializar el Geocoder de Cesium
    const cesiumGeocoder = new Cesium.Geocoder({
      container: document.createElement("div"), // No necesitamos mostrar el widget por defecto
      geocoderServices: [
        new Cesium.IonGeocoderService({
          accessToken: "your_ion_access_token", // Reemplaza con tu token de Cesium Ion
        }),
        // Puedes agregar más servicios de geocoding aquí
      ],
      autoComplete: true, // Habilitar autocompletado
    });

    setGeocoder(cesiumGeocoder);

    return () => {
      // Limpieza si es necesario
    };
  }, [viewer]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!geocoder || !searchTerm.trim()) return;

    try {
      // Realizar la búsqueda
      const results = await geocoder.geocode(searchTerm);

      if (results.length > 0) {
        // Volar a la primera ubicación encontrada
        viewer.camera.flyTo({
          destination: results[0].destination,
          duration: 2,
          complete: () => {
            // Puedes mostrar un marcador o información adicional aquí
            console.log("Ubicación encontrada:", results[0]);
          },
        });
      } else {
        console.log("No se encontraron resultados para:", searchTerm);
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  return (
    <div className="toolbar">
      <form onSubmit={handleSearchSubmit} className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar dirección o lugar..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="toolbar-icons">{/* Otros íconos de la toolbar */}</div>
    </div>
  );
};

export default Toolbar;
