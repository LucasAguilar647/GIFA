import React, { useState } from 'react';
import { cargarMantenimientoManual } from '../../services/mantenimientoService'; 
import { useSelector } from 'react-redux';
import { Button } from '@nextui-org/react';
import '../RegistroDeControlesRutinarios/styles/RegistroControlesRutinarios.css'

const RegistrarMantenimiento = () => {
  const [formData, setFormData] = useState({
    asunto: '',
    vehiculo_id: '',
  });
  const [successMessage, setSuccessMessage] = useState(false); 
  const token = useSelector((state) => state.user.token); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await cargarMantenimientoManual(formData, token);
      console.log('Mantenimiento registrado:', response);

      
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000); 
      
      
      setFormData({
        asunto: '',
        vehiculo_id: '',
      });
      
    } catch (error) {
      console.error('Error al registrar el mantenimiento:', error);
    }
  };

  return (
    <div className="container">
      <h2>Registrar Mantenimiento Manual</h2>

      {successMessage && (
        <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>
          ¡Mantenimiento registrado con éxito!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Asunto:
            <input
              type="text"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            ID del Vehículo:
            <input
              type="number"
              name="vehiculo_id"
              value={formData.vehiculo_id}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <Button color="success" type="submit">Registrar Mantenimiento</Button>
      </form>
    </div>
  );
};

export default RegistrarMantenimiento;
