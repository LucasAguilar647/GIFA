import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


L.Marker.prototype.options.icon = DefaultIcon;

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
