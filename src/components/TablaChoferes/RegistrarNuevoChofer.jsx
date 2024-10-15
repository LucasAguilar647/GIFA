import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@nextui-org/react';
import '../RegistroDeControlesRutinarios/styles/RegistroControlesRutinarios.css';
import { registrarChofer } from '../../services/choferesService';

const RegistrarNuevoChofer = ({ irAtras }) => { 
  const [formData, setFormData] = useState({
    nombre: '',
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
      await registrarChofer(formData, token);
      setSuccessMessage(true);
      
      setTimeout(() => {
        setSuccessMessage(false);
        irAtras(); 
      }, 2000); 
      
      setFormData({
        nombre: ''
      });
      
    } catch (error) {
      console.error('Error al registrar el mantenimiento:', error);
    }
  };

  return (
    <div className="container">
      <h2>Registrar Nuevo chofer</h2>

      {successMessage && (
        <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>
          ¡Chofer registrado con éxito!
        </div>
      )}


      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
           Nombre
            <input
              type="text"
              name="asunto"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <Button color="success" type="submit">Registrar chofer</Button>
      <Button color="danger" onClick={irAtras} style={{ marginBottom: '15px' }}>
       Cancelar
      </Button>
      </form>
    </div>
  );
};

export default RegistrarNuevoChofer;
