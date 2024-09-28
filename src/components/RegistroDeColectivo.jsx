import React, { useState } from 'react';
import '../styles/registroDeColectivo.css';

export const RegistroDeColectivo = () => {
  const [formData, setFormData] = useState({
    patente: '',
    chasis: '',
    antiguedad: '',
    kilometraje: '',
    litrosTanque: 800,
    chofer: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Registro guardado:', formData);
    
    // Aquí podrías agregar la lógica para guardar el registro en la API o el estado global
  };

  return (
    <div className="container">
      <h2>Registro de Colectivo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">
            Patente:
            <input
              type="text"
              name="patente"
              value={formData.patente}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Chasis:
            <input
              type="text"
              name="chasis"
              value={formData.chasis}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Antigüedad:
            <input
              type="number"
              name="antiguedad"
              value={formData.antiguedad}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Kilometraje:
            <input
              type="number"
              name="kilometraje"
              value={formData.kilometraje}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Litros de Tanque:
            <input
              type="number"
              name="litrosTanque"
              value={formData.litrosTanque}
              readOnly
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Chofer:
            <input
              type="text"
              name="chofer"
              value={formData.chofer}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <button type="submit" className="button">Registrar Colectivo</button>
      </form>
    </div>
  );
};
