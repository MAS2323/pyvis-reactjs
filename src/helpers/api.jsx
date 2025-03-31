const API_BASE_URL = "http://127.0.0.1:8000";

// Función auxiliar para extraer el SN de un objeto si es necesario
const getSerialNumber = (sn) => {
  if (typeof sn === "object" && sn !== null) {
    return sn.sn || sn.id || null;
  }
  return sn;
};

export const fetchAllDevices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/device-info/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching all devices:", error);
    return [];
  }
};

export const fetchFibcabsForDevice = async (deviceSn) => {
  const serialNumber = getSerialNumber(deviceSn);
  if (!serialNumber) return [];

  try {
    const response = await fetch(
      `${API_BASE_URL}/fibcab/dev-info/?device_sn=${encodeURIComponent(
        serialNumber
      )}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`No fibcabs found for device SN ${serialNumber}`);
        return [];
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching fibcabs for device SN ${serialNumber}:`,
      error
    );
    return [];
  }
};

export const fetchDevice = async (sn) => {
  const serialNumber = getSerialNumber(sn);
  if (!serialNumber) {
    console.error("SN inválido o no proporcionado.");
    return null;
  }

  try {
    console.log(`Buscando dispositivo con SN: ${serialNumber}`);
    const response = await fetch(
      `${API_BASE_URL}/device-info/${encodeURIComponent(serialNumber)}`
    );

    console.log(`Respuesta del servidor para SN ${serialNumber}:`, response);

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Dispositivo con SN ${serialNumber} no encontrado.`);
        return null;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Datos recibidos para SN ${serialNumber}:`, data);
    return data;
  } catch (error) {
    console.error(
      `Error al obtener el dispositivo con SN ${serialNumber}:`,
      error
    );
    return null;
  }
};

export const fetchFibcab = async (sn) => {
  const serialNumber = getSerialNumber(sn);
  if (!serialNumber) {
    console.error("SN inválido o no proporcionado.");
    return null;
  }

  try {
    console.log(`Buscando fibra con SN: ${serialNumber}`);
    const response = await fetch(
      `${API_BASE_URL}/fibcab/dev-info/${encodeURIComponent(serialNumber)}`
    );

    console.log(`Respuesta del servidor para SN ${serialNumber}:`, response);

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Fibra con SN ${serialNumber} no encontrada.`);
        return null;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Datos recibidos para SN ${serialNumber}:`, data);
    return data;
  } catch (error) {
    console.error(`Error al obtener la fibra con SN ${serialNumber}:`, error);
    return null;
  }
};
