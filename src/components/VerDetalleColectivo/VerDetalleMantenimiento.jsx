
import React, { useEffect, useState } from 'react';
import { verMantenimientoPorVehiculo } from '../../services/mantenimientoService'; 
import CardMantenimiento from '../Card/CardMantenimiento';

export const VerDetalleMantenimiento = ({ idVehiculo, token, irAtras }) => {
  const [mantenimiento, setMantenimiento] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMantenimiento = async () => {
      try {
        const response = await verMantenimientoPorVehiculo(idVehiculo, token); 
        if (response.mantenimientos.length > 0) {
          setMantenimiento(response.mantenimientos[0]); 
        } else {
          setError("No se encontró ningún mantenimiento para este vehículo.");
        }
      } catch (error) {
        setError("Error al cargar los detalles del mantenimiento.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMantenimiento();
  }, [idVehiculo, token]);

  if (isLoading) return <p>Cargando detalles del mantenimiento...</p>;
  if (error) return <p>{error}</p>;
  if (!mantenimiento) return <p>No hay datos disponibles.</p>;

  const repuestosAgrupados = mantenimiento.itemUtilizado.reduce((acc, { item, cantidad }) => {
    if (!acc[item]) {
      acc[item] = cantidad;
    } else {
      acc[item] += cantidad;
    }
    return acc;
  }, {});

  return (
    <CardMantenimiento 
      mantenimiento={mantenimiento} 
      repuestosAgrupados={repuestosAgrupados} 
      onVolver={irAtras} 
    />
  );
};

export default VerDetalleMantenimiento;
