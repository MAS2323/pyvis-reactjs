const API_BASE_URL = "http://127.0.0.1:8000";

// Función auxiliar para extraer el SN de un objeto si es necesario
const getSerialNumber = (sn) => {
  if (typeof sn === "object" && sn !== null) {
    return sn.sn || sn.id || null;
  }
  return sn;
};

export const fetchDevice = async (sn) => {
  const serialNumber = getSerialNumber(sn);
  if (!serialNumber) return null;

  try {
    const response = await fetch(
      `${API_BASE_URL}/device-info/${encodeURIComponent(serialNumber)}`
    );
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching device with SN ${serialNumber}:`, error);
    return null;
  }
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

export const fetchFibcab = async (sn) => {
  const serialNumber = getSerialNumber(sn);
  if (!serialNumber) return null;

  try {
    const response = await fetch(
      `${API_BASE_URL}/fibcab/dev-info/${encodeURIComponent(serialNumber)}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Fibcab with SN ${serialNumber} not found`);
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching fibcab with SN ${serialNumber}:`, error);
    return null;
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
