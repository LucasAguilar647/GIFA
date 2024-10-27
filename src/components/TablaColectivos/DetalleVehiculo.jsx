import React from "react";
import { QRCodeCanvas } from "qrcode.react"; 
import { Button } from "@nextui-org/react";

function DetalleVehiculo({ vehiculo, irAtras }) {
  const handleDownloadQR = () => {
    const canvas = document.getElementById("qrCanvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `QR_${vehiculo.patente}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };



  return (
    <div>
      <h2>Detalles del Vehículo</h2>
      <p><strong>Patente:</strong> {vehiculo.patente}</p>
      <p><strong>Antigüedad:</strong> {vehiculo.antiguedad} años</p>
      <p><strong>Kilometraje:</strong> {vehiculo.kilometraje} km</p>
      <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
      <p><strong>Estado:</strong> {vehiculo.estadoVehiculo}</p>
      <p><strong>Fecha de Vencimiento:</strong> {vehiculo.fechaVencimiento}</p>

      <div>
        <h3>Código QR</h3>
        <QRCodeCanvas
          id="qrCanvas"
          value={vehiculo.qr}
          size={150}
        />
        <Button onClick={handleDownloadQR}>Descargar QR</Button>
      </div>

      <Button onClick={irAtras}>Volver</Button>
    </div>
  );
}

export default DetalleVehiculo;
