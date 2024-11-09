import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { verPosiciones } from '../../services/traccar';
import MapaPosiciones from './MapaPosiciones';
import './styles/Posiciones.css';
import iconBusqueda from '../../assets/icons/busqueda.png';

export const Posiciones = () => {
  const token = useSelector((state) => state.user.token);
  const [id, setId] = useState("");
  const [positions, setPositions] = useState([]); 
  const [buscarClickeado, setBuscarClickeado] = useState(false); 
  const [timeoutId, setTimeoutId] = useState(null);

  const fetchPosiciones = async () => {
    if (id.trim() !== "") {
      try {
        setBuscarClickeado(true); 
        const response = await verPosiciones(id, token);
        const posiciones = response.map((pos) => [pos.latitude, pos.longitude]);
        setPositions(posiciones);
      } catch (error) {
        console.error("Error fetching positions:", error);
        setPositions([]); 
      }
      
   
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      
      const idTimeout = setTimeout(() => {
        setBuscarClickeado(false);
      }, 2000);
      
      setTimeoutId(idTimeout); 
    } else {
      alert("Por favor, ingrese una patente.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchPosiciones(); 
    }
  };

  return (
    <div className="container-posiciones">
      <h1>Recorrido de colectivo</h1>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value.toUpperCase())}
        placeholder="Ingrese la patente del colectivo"
        className="input-posiciones"
        onKeyPress={handleKeyPress}  
      />
    
      <img
        src={iconBusqueda}
        alt="Buscar"
        className="search-icon-posiciones"
        onClick={fetchPosiciones}
      />

      {positions.length > 0 ? (
        <MapaPosiciones posiciones={positions} />
      ) : (
        buscarClickeado && positions.length === 0 && (
          <p className="no-data-posiciones">El colectivo no tiene recorridos hechos.</p>
        )
      )}
    </div>
  );
};

export default Posiciones;
