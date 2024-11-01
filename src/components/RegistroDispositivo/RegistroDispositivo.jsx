import React, { useState } from 'react';
import '../RegistroDeColectivo/styles/RegistroDeColectivo.css';
import { Button } from '@nextui-org/react';
import { showsuccessAlert } from '../SweetAlert/SweetAlertSucces';
import { showErrorAlert } from '../SweetAlert/SweetAlertError';
import { crearDispositivo } from '../../services/traccar';
import { useSelector } from 'react-redux';

export const RegistroDispositivo = () => {
  const [formData, setFormData] = useState({
    name: '',
    uniqueId: '',
  });

  const token = useSelector((state) => state.user.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, uniqueId } = formData;

    
    if (!name.trim()) {
      alert('Debe proporcionar un nombre');
      return;
    }
    if (!uniqueId.trim()) {
      alert('Debe proporcionar un ID único');
      return;
    }

    const data = {
      name: name.trim(),
      uniqueId: uniqueId.trim(),
    };

    console.log(data)

    try {
        const response = await crearDispositivo(data, token);
        setFormData({
            name: '',
            uniqueId: '',
        });
    
        showsuccessAlert('¡Registro exitoso del dispositivo!','El dispositivo fue agregado correctamente')
      } catch (error) {
        showErrorAlert('Error al registrar el dispositivo',error)
      }
  };

  return (
    <div className="container">
      <h2>Registrar Dispositivo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            ID Único:
            <input
              type="text"
              name="uniqueId"
              value={formData.uniqueId}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="button-group">
          <Button color="success" type="submit">Registrar Dispositivo</Button>
        </div>
      </form>
    </div>
  );
};

export default RegistroDispositivo;
