import React, { useEffect, useState, useRef } from "react";
import handleStartScan from "../../Hooks/Scan";
import VerDetalleMantenimiento from "../VerDetalleColectivo/VerDetalleMantenimiento"; 
import { useSelector } from "react-redux";

export const ScannerQR = () => {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);
  const token = useSelector((state) => state.user.token); 

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, []);

  const handleIniciarEscaneo = () => {
    handleStartScan(setScanResult, scannerRef); 
  };

  const handleIrAtras = () => {
    setScanResult(null); 
  };

  return (
    <div className="container-actualizarStock">
      <div className="container-subb">
        <button className="boton-inicio" onClick={handleIniciarEscaneo}>
          Iniciar escaneo
        </button>
        <div id="reader" style={{ width: "340px", height: "300px", marginTop: "7px" }}></div>
      </div>
      
      {scanResult && (
        <VerDetalleMantenimiento 
          idVehiculo={scanResult} 
          token={token} 
          irAtras={handleIrAtras} 
        />
      )}
    </div>
  );
};

export default ScannerQR;
