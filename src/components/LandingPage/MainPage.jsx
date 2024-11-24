import React from 'react';
import { Button } from '@mui/material';
import './MainPage.css';  
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/LogoNavBar.jpeg';
import CardLanding from './CardLanding';

const MainPage = () => {
    const navigate = useNavigate();

    const handleIniciarSesion = () => {
        navigate('/login'); 
    }

    return (
        <div className="main-container">
            <header className="header">
                <Button 
                    className="login-button" 
                    variant="contained" 
                    color="primary"
                    onClick={handleIniciarSesion}
                >
                    Iniciar Sesión
                </Button>
            </header>

            <div className="content-wrapper">
                <div className="welcome-card">
                    <img className="logo" src={logo} alt="Flota de Colectivos" />
                    <h1 className="title">Bienvenido al Sistema de Gestión integral de vehículos</h1>
                    <p className="description">
                        Gestiona y controla la flota de colectivos, mantén un seguimiento de los vehículos, mantenimiento, inventario y más.
                    </p>
                </div>

                <div className="info-section">
                    <div className="info-item">
                        <h2>¿Quiénes somos?</h2>
                        <p>
                            Somos un equipo dedicado a mejorar la gestión de flotas de transporte. Nuestra misión es optimizar la operación de colectivos a través de soluciones tecnológicas innovadoras.
                        </p>
                    </div>

                    <div className="info-item">
                        <h2>¿Qué hacemos?</h2>
                        <p>
                            Desarrollamos herramientas de gestión de flotas, mantenimiento, inventarios y control de combustible, todo en un solo lugar para una administración más eficiente.
                        </p>
                    </div>
                    <div className='img-section' >
                        <CardLanding titulo={"Monitoreo en tiempo real"}  imagen={logo}/>
                        <CardLanding titulo={"Mantenimiento Programado"}  imagen={logo}/>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <p>&copy; 2024 ItLab - Todos los derechos reservados</p>
            </footer>
        </div>
    );
};

export default MainPage;
