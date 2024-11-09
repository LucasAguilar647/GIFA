import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Principal from '../../components/Principal/Principal';
import NavBar from '../../components/NavBar/NavBar';
import '../Home/Styles/home.css';
import { MagicMotion } from "react-magic-motion";

import iconColectivos from '../../assets/icons/autobus.png';
import iconInventario from '../../assets/icons/alt-de-inventario.png';
import iconMantenimiento from '../../assets/icons/mantenimientos.png';
import iconChofer from '../../assets/icons/chofer.png';
import iconPedidoAceptado from '../../assets/icons/pedido-aceptado.png';
import iconPortapales from '../../assets/icons/lista-del-portapapeles.png';
import iconProveeedor from '../../assets/icons/proveedor-alternativo.png';
import iconInconsistencias from '../../assets/icons/inconsistencias.png';
import iconMapa from '../../assets/icons/mapa.png';
import iconUsuarioAdmin from '../../assets/icons/usuario-admin.png';
import iconAgregarUsuario from '../../assets/icons/agregar-usuario.png';
import iconPedidoPendiente from '../../assets/icons/pedidos.png';
import iconTareas from '../../assets/icons/tareas.png';
import iconTareasToDo from '../../assets/icons/tareas-todo.png';
import iconScan from '../../assets/icons/qr.png';
import iconCombustible from '../../assets/icons/combustible.png';

export const Home = () => {
  const userRole = useSelector((state) => state.user.role);

  const getDefaultMenu = (role) => {
    switch (role) {
      case 'ADMINISTRADOR':
        return 'Colectivos';
      case 'SUPERVISOR':
        return 'Colectivos';
      case 'OPERADOR':
        return 'TareasAsignadas';
      case 'GERENTE':
        return 'MetricaBitacora';
      case 'CHOFER':
        return 'CargarCombustible';
      default:
        return 'Home';
    }
  };

  const [activeMenu, setActiveMenu] = useState(getDefaultMenu(userRole));

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };


  const menuItems = {
    ADMINISTRADOR: [
      { name: 'Colectivos', icon: iconColectivos },
      { name: 'Inventario', icon: iconInventario },
      { name: 'Mantenimientos', icon: iconMantenimiento },
      { name: 'Choferes', icon: iconChofer },
      { name: 'PedidosAceptados', icon: iconPedidoAceptado },
      { name: 'RegistroDeColectivo', icon: iconPortapales },
      { name: 'RegistroProveedor', icon: iconProveeedor },
      { name: 'Inconsistencias', icon: iconInconsistencias },
      { name: 'Posiciones', icon: iconMapa },
      { name: 'Usuarios', icon: iconUsuarioAdmin },
      { name: 'RegistroDeUsuario', icon: iconAgregarUsuario },
    ],
    SUPERVISOR: [
      { name: 'Colectivos', icon: iconColectivos },
      { name: 'Inventario', icon: iconInventario },
      { name: 'Choferes', icon: iconChofer },
      { name: 'Pedidos', icon: iconPedidoPendiente },
      { name: 'Proveedores', icon: iconProveeedor },
    ],
    OPERADOR: [
      { name: 'TareasAsignadas', icon: iconTareas },
      { name: 'AsignarTarea', icon: iconTareasToDo },
      { name: 'ScannerQR', icon: iconScan },
    ],
    GERENTE: [
      { name: 'MetricaBitacora' },
      { name: 'MetricaStock' },
      { name: 'MetricaFlota' },
    ],
    CHOFER: [
      { name: 'CargarCombustible', icon: iconCombustible },
    ]
  };

  return (
      <div className="DashboardWrapper">
        {/*<NavBar2/>*/}
        <NavBar/>
        <div className="MainContent">
          <div className="Sidebar">
            {menuItems[userRole] && menuItems[userRole].map(item => (
              <div 
                key={item.name} 
                className={`MenuItem ${activeMenu === item.name ? 'active' : ''}`} 
                onClick={() => handleMenuClick(item.name)}
              >
                {item.name}
                {item.icon && <img src={item.icon} alt={item.name} className="menu-icon" />}
              </div>
            ))}
          </div>
          <div className="ContentArea">
            <Principal activeMenu={activeMenu} />
          </div>
        </div>
      </div>
  );
};

export default Home;
