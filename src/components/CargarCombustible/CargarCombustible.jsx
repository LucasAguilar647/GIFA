import React, { useState } from 'react';
import '../RegistroDeColectivo/styles/RegistroDeColectivo.css';
import { Button } from '@nextui-org/react';
import { cargarCombustible } from '../../services/gestionDeCombustibleService';
import { useSelector } from 'react-redux';
import { showsuccessAlert } from '../SweetAlert/SweetAlertSucces';
import { showErrorAlert } from '../SweetAlert/SweetAlertError';

export const CargarCombustible = () => {
  const [formData, setFormData] = useState({
    cantidadLitros: 0,
    numeroTarjeta: 0,
  });

  const token = useSelector((state) => state.user.token); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'cantidadLitros' || name === 'numeroTarjeta'
        ? (isNaN(parseInt(value)) ? '' : parseInt(value))
        : value,
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { cantidadLitros, numeroTarjeta } = formData;

    if (cantidadLitros <= 0) {
      alert('La cantidad de litros debe ser mayor a 0');
      return;
    }

    if (numeroTarjeta <= 0) {
      alert('Debe proporcionar un número de tarjeta válido');
      return;
    }


    const data = {
      cantidadLitros,
      numeroTarjeta,
    };

    console.log(data)

    try {
      const response = await cargarCombustible(data, token);
      console.log(response)
      setFormData({
        cantidadLitros: 0,
        numeroTarjeta: 0,
      });
      
      showsuccessAlert('¡Registro exitoso de la carga!','La carga fue agregado correctamente')
    } catch (error) {
      showErrorAlert('Error al registrar la carga',error);
    }
  };

  return (
    <div className="container">
      <h2>Cargar Combustible</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">
            Cantidad de Litros:
            <input
              type="number"
              name="cantidadLitros"
              value={formData.cantidadLitros === 0 ? '' : formData.cantidadLitros}
              onChange={handleChange}
              min="1"
              step="1"
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Número de Tarjeta:
            <input
              type="number"
              name="numeroTarjeta"
              value={formData.numeroTarjeta === 0 ? '' : formData.numeroTarjeta}
              onChange={handleChange}
              min="1"
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="button-group">
          <Button color="success" type="submit">Cargar combustible</Button>
        </div>
      </form>
    </div>
  );
};

export default CargarCombustible;
