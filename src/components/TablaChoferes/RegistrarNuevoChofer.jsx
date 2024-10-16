import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@nextui-org/react';
import '../RegistroDeControlesRutinarios/styles/RegistroControlesRutinarios.css';
import { registrarChofer } from '../../services/choferesService';

export const RegistrarNuevoChofer = ({ irAtras }) => { 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nombre: '',
  });
  
  const [successMessage, setSuccessMessage] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(false); 
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
      setErrorMessage(false); 
      
      
      setTimeout(() => {
        setSuccessMessage(false);
        irAtras(); 
      }, 2000); 
      
     
      setFormData({
        username: '',
        password: '',
        nombre: ''
      });
      
    } catch (error) {
      console.error('Error al registrar el chofer:', error);
      setErrorMessage(true); 
    }
  };

  return (
    <div className="container">
      <h2>Registrar Nuevo Chofer</h2>

      {successMessage && (
        <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>
          ¡Chofer registrado con éxito!
        </div>
      )}

      {errorMessage && (
        <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>
          Error al registrar el chofer. Intente de nuevo.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Nombre
            <input
              type="text"
              name="nombre"
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
