import { Html5QrcodeScanner } from "html5-qrcode";


const handleStartScan = (setScanResult, scannerRef) => {
  setScanResult(null);

  if (!scannerRef.current) {
    const html5QrCodeScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 370, height: 370 },
      aspectRatio: 1.0,
      disableFlip: false,
    });

    const onScanSuccess = async (decodedText) => {
      setScanResult(decodedText); 

      /*
      try {
        const producto = await getProducto(scannedID);
        if (producto) {
          console.log("Producto encontrado:", producto);
          // Aquí puedes manejar el producto según sea necesario
        } else {
          console.warn("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }
      */

     
      html5QrCodeScanner.clear();
      scannerRef.current = null;
    };

    const onScanError = (error) => {
      console.warn("Error al escanear el código QR:", error);
    };

    html5QrCodeScanner.render(onScanSuccess, onScanError);
    scannerRef.current = html5QrCodeScanner;
  } else {
    
    scannerRef.current.clear();
    scannerRef.current.render(onScanSuccess, onScanError);
  }
};

export default handleStartScan;
