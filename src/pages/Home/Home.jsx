import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Principal from '../../components/Principal/Principal';
import NavBar from '../../components/NavBar/NavBar';
import '../Home/Styles/home.css';
import iconColectivos from '../../assets/icons/autobus.png'
import iconPortapales from '../../assets/icons/lista-del-portapapeles.png'
import iconInventario from '../../assets/icons/alt-de-inventario.png'
import iconMantenimiento from '../../assets/icons/mantenimientos.png'
import iconChofer from '../../assets/icons/chofer.png'
import iconProveeedor from '../../assets/icons/proveedor-alternativo.png'
import iconPedidoAceptado from '../../assets/icons/pedido-aceptado.png'
import iconUsuarioAdmin from '../../assets/icons/usuario-admin.png'
import iconPedidoPendiente from '../../assets/icons/pedidos.png'
import iconTareasToDo from '../../assets/icons/tareas-todo.png'
import iconTareas from '../../assets/icons/tareas.png'
import iconScan from '../../assets/icons/qr.png'
import iconCombustible from '../../assets/icons/combustible.png'



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
        return 'MetricaBitacora'
      case 'CHOFER':
        return 'CargarCombustible'
      default:
        return 'Home'; 
    }
  };

  const [activeMenu, setActiveMenu] = useState(getDefaultMenu(userRole)); 

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="DashboardWrapper">
      <NavBar />
      <div className="MainContent">
        <div className="Sidebar"> 
          {userRole === 'ADMINISTRADOR' && (
            <>
              <div className={`MenuItem ${activeMenu === 'Colectivos' ? 'active' : ''}`} onClick={() => handleMenuClick('Colectivos')}>
              Colectivos
              <img src={iconColectivos} alt="Colectivos" className="menu-icon" />
              </div>

              <div className={`MenuItem ${activeMenu === 'RegistroDeColectivo' ? 'active' : ''}`} onClick={() => handleMenuClick('RegistroDeColectivo')}>
                Registro de colectivo
                <img src={iconPortapales} alt="RegistroDeColectivo" className="menu-icon" />
                </div>

              <div className={`MenuItem ${activeMenu === 'Inventario' ? 'active' : ''}`} onClick={() => handleMenuClick('Inventario')}>
                Inventario
                <img src={iconInventario} alt="Inventario" className="menu-icon" />
                </div>

              <div className={`MenuItem ${activeMenu === 'Mantenimientos' ? 'active' : ''}`} onClick={() => handleMenuClick('Mantenimientos')}>
                Mantenimientos
                <img src={iconMantenimiento} alt="Mantenimientos" className="menu-icon" />
                </div>

              <div className={`MenuItem ${activeMenu === 'Choferes' ? 'active' : ''}`} onClick={() => handleMenuClick('Choferes')}>
                Choferes
                <img src={iconChofer} alt="Choferes" className="menu-icon" />
                </div>

              <div className={`MenuItem ${activeMenu === 'RegistroProveedor' ? 'active' : ''}`} onClick={() => handleMenuClick('RegistroProveedor')}>
                Registro de proveedor
                <img src={iconProveeedor} alt="RegistroProveedor" className="menu-icon" />
                </div>

              <div className={`MenuItem ${activeMenu === 'PedidosAceptados' ? 'active' : ''}`} onClick={() => handleMenuClick('PedidosAceptados')}>
                Pedidos aceptados
                <img src={iconPedidoAceptado} alt="PedidosAceptados" className="menu-icon" />
                </div>

              <div className={`MenuItem ${activeMenu === 'Inconsistencias' ? 'active' : ''}`} onClick={() => handleMenuClick('Inconsistencias')}>Inconsistencias</div>
              
              <div className={`MenuItem ${activeMenu === 'Usuarios' ? 'active' : ''}`} onClick={() => handleMenuClick('Usuarios')}>
                Usuarios
                <img src={iconUsuarioAdmin} alt="Usuarios" className="menu-icon" />
                </div>
            </>
          )}
          {userRole === 'SUPERVISOR' && (
            <>
              <div className={`MenuItem ${activeMenu === 'Colectivos' ? 'active' : ''}`} onClick={() => handleMenuClick('Colectivos')}>
                Colectivos
                <img src={iconColectivos} alt="Colectivos" className="menu-icon" />
                </div>

              <div className={`MenuItem ${activeMenu === 'Inventario' ? 'active' : ''}`} onClick={() => handleMenuClick('Inventario')}>
                Inventario
                <img src={iconInventario} alt="Inventario" className="menu-icon" />
                </div>

              <div className={`MenuItem ${activeMenu === 'Pedidos' ? 'active' : ''}`} onClick={() => handleMenuClick('Pedidos')}>
                Pedidos
                <img src={iconPedidoPendiente} alt="PedidosAceptados" className="menu-icon" />

                </div>

              <div className={`MenuItem ${activeMenu === 'Choferes' ? 'active' : ''}`} onClick={() => handleMenuClick('Choferes')}>
                Choferes
                <img src={iconChofer} alt="Choferes" className="menu-icon" />
                </div>

              <div className={`MenuItem ${activeMenu === 'Proveedores' ? 'active' : ''}`} onClick={() => handleMenuClick('Proveedores')}>
                Proveedores
                <img src={iconProveeedor} alt="RegistroProveedor" className="menu-icon" />
                </div>
              
            </>
          )}
          {userRole === 'OPERADOR' && (
            <>
              <div className={`MenuItem ${activeMenu === 'TareasAsignadas' ? 'active' : ''}`} onClick={() => handleMenuClick('TareasAsignadas')}>
                Mis tareas
                <img src={iconTareas} alt="TareasAsignadas" className="menu-icon" />
                </div>

              <div className={`MenuItem ${activeMenu === 'AsignarTarea' ? 'active' : ''}`} onClick={() => handleMenuClick('AsignarTarea')}>
                Pendientes
                <img src={iconTareasToDo} alt="AsignarTarea" className="menu-icon" />
                </div>

              <div className={`MenuItem ${activeMenu === 'ScannerQR' ? 'active' : ''}`} onClick={() => handleMenuClick('ScannerQR')}>
                Scanner
                <img src={iconScan} alt="ScannerQR" className="menu-icon" />
                </div>
              
            </>
          )}
           {userRole === 'GERENTE' && (
            <>
              <div className={`MenuItem ${activeMenu === 'MetricaBitacora' ? 'active' : ''}`} onClick={() => handleMenuClick('MetricaBitacora')}>Métrica de Bitácora de Mantenimiento y Uso</div>
              <div className={`MenuItem ${activeMenu === 'MetricaStock' ? 'active' : ''}`} onClick={() => handleMenuClick('MetricaStock')}>Métrica de Gestión de Stock y Compras</div>
              <div className={`MenuItem ${activeMenu === 'MetricaFlota' ? 'active' : ''}`} onClick={() => handleMenuClick('MetricaFlota')}>Métrica de Gestión de Controles de Flota</div>
            </>
          )}
          {userRole === 'CHOFER' && (
            <>
              <div className={`MenuItem ${activeMenu === 'CargarCombustible' ? 'active' : ''}`} onClick={() => handleMenuClick('CargarCombustible')}>
                Cargar combustible

                <img src={iconCombustible} alt="CargarCombustible" className="menu-icon" />
                </div>
             
            </>
          )}
          
        </div>
        <div className="ContentArea"> 
          <Principal activeMenu={activeMenu} />
        </div>
      </div>
    </div>
  );
};

export default Home;
