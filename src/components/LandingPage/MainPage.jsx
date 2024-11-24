import React from 'react';
import { Button } from '@mui/material';
import './MainPage.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/LogoNavBar.jpeg';
import sampleVideo from '../../assets/Videos/sampleVideo.mp4'; 

const MainPage = () => {
    const navigate = useNavigate();

    const handleIniciarSesion = () => {
        navigate('/login');
    };

    return (
        <div className="main-container">
            <header className="header">
                <Button variant="contained" color="primary" onClick={handleIniciarSesion}>Iniciar Sesión</Button>
            </header>

            <div className="content-wrapper">
                <div className="welcome-card">
                    <img className="logo" src={logo} alt="Flota de Colectivos" />
                    <h1 className="title">Bienvenido al Sistema de Gestión de Flota</h1>
                    <p className="description">
                        Gestiona y controla la flota de colectivos, mantén un seguimiento de los vehículos, mantenimiento, inventario y más.
                    </p>
                </div>


                <section className="info-section">
                    <h2>Conoce Nuestro Sistema</h2>
                    <p>Descubre las funcionalidades y ventajas de nuestro sistema de gestión de flotas con el siguiente video.</p>

                    <div className="video-container">
                        <video className="video-player" controls>
                            <source src={sampleVideo} type="video/mp4" />
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    </div>
                </section>
            </div>

            <footer className="footer">
                <p>&copy; 2024 ITlab - Todos los derechos reservados</p>
            </footer>
        </div>
    );
};

export default MainPage;
