import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const MapaPosiciones = ({ posiciones }) => {
  const [center, setCenter] = useState([0, 0]);

  useEffect(() => {
    if (posiciones.length > 0) {
      setCenter(posiciones[0]); 
    }
  }, [posiciones]);

  if (posiciones.length === 0) {
    return <p>El colectivo no tiene recorridos hechos.</p>;
  }

  return (
    <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }} key={center.toString()}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />

      
      {posiciones.length > 1 && <Polyline positions={posiciones} color="red" />}

    
      {posiciones.map((pos, index) => (
        <Marker key={index} position={pos}>
          <Popup>
            <div>Posición: {pos}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaPosiciones;