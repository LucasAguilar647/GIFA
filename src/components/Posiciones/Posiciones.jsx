import React, { useState } from 'react';
import PosicionesTiempoReal from './PosicionesTiempoReal';
import PosicionesEnRango from './PosicionesEnRango';
import { Button } from '@nextui-org/react';

export const Posiciones = () => {
  
  const [mostrarTiempoReal, setMostrarTiempoReal] = useState(true);

  
  const toggleComponent = () => {
    setMostrarTiempoReal((prevState) => !prevState);
  };

  return (
    <div>
      <div>
        <Button color='primary' onClick={toggleComponent}>
          {mostrarTiempoReal === null || !mostrarTiempoReal ?  'Posición en Rango' :'Posición en tiempo real'}
        </Button>
      </div>

     
      {mostrarTiempoReal === null ? null : mostrarTiempoReal ? (
        <PosicionesEnRango />
      ) : (
        <PosicionesTiempoReal />
      )}
    </div>
  );
};

export default Posiciones;
