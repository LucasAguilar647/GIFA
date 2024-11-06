import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { verPosiciones } from '../../services/traccar';
import MapaPosiciones from './MapaPosiciones';

export const Posiciones = () => {
  const token = useSelector((state) => state.user.token);
  const [id, setId] = useState("");
  const [positions, setPositions] = useState([]); 

  const fetchPosiciones = async () => {
    try {
      const response = await verPosiciones(id, token);
      const posiciones = response.map((pos) => [pos.latitude, pos.longitude]);
      setPositions(posiciones);
    } catch (error) {
      console.error("Error fetching positions:", error);
      setPositions([]); 
    }
  };

  useEffect(() => {
    fetchPosiciones();
  }, []); 

  return (
    <div>
      <h2>Recorrido de colectivo</h2>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value.toUpperCase())}
        placeholder="Ingrese la patente del colectivo"
      />
      <button onClick={fetchPosiciones}>Buscar</button>

     
      {positions.length > 0 ? (
        <MapaPosiciones posiciones={positions} />
      ) : (
        <p>El colectivo no tiene recorridos hechos.</p>
      )}
    </div>
  );
};

export default Posiciones;
