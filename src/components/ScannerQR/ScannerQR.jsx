import React, { useEffect, useState, useRef } from "react";
import handleStartScan from "../../Hooks/Scan";



export const ScannerQR = () => {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);

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

  return (
    <div className="container-actualizarStock">
      <div className="container-subb">
        <button className="boton-inicio" onClick={handleIniciarEscaneo}>
          Iniciar escaneo
        </button>
          <div id="reader" style={{ width: "340px", height: "300px", marginTop: "7px" }}></div>
      </div>
    </div>
  );
};

export default ScannerQR;
