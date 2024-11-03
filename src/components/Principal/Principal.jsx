import React from 'react';
import { useSelector } from 'react-redux'; 
import TablaDeColectivos from '../TablaColectivos/TablaColectivos';
import { RegistroDeColectivo } from '../RegistroDeColectivo/RegistroDeColectivo';
import { HistorialDeMantenimientos } from '../HistorialDeMantenimiento/HistorialDeMantenimientos';
import AsignarTareas from '../AsignarTareas/AsignarTareas';
import { TareasAsignadas } from '../TareasAsignadas/TareasAsignadas';
import TablaDeChoferes from '../TablaChoferes/TablaDeChoferes';
import { MetricaBitacora } from '../../MetricasGlobales/MetricaBitacora/MetricaBitacora';
import { MetricaStock } from '../../MetricasGlobales/MetricaStock/MetricaStock';
import { MetricaFlota } from '../../MetricasGlobales/MetricaFlota/MetricaFlota';
import TablaPedidosRealizados from '../TablaPedidos/TablaPedidosRealizados';
import { RegistroProveedor } from '../RegistroProveedor.jsx/RegistroProveedor';
import TablaDeInventario from '../TablaInventario/TablaInventario';
import { TablaDeProveedores } from '../TablaProveedores/TablaProveedores';
import TablaPedidosAceptados from '../TablaPedidos/TablaPedidosAceptados';
import ScannerQR from '../ScannerQR/ScannerQR';
import { CargarCombustible } from '../CargarCombustible/CargarCombustible';
import { Inconsistencias } from '../Inconsistencias/Inconsistencias';
import { Usuarios } from '../Usuarios/Usuarios';





export const Principal = ({ activeMenu }) => {
  const userRole = useSelector((state) => state.user.role); 

  return (
    <div>
      {activeMenu === 'RegistroDeColectivo' && userRole === 'ADMINISTRADOR' && <RegistroDeColectivo />} 
      {activeMenu === 'Inventario' && (userRole === 'ADMINISTRADOR' || userRole === 'SUPERVISOR' || userRole === 'OPERADOR' ) && <TablaDeInventario userRole={userRole} />}
      {activeMenu === 'Choferes' && (userRole === 'ADMINISTRADOR' || userRole === 'SUPERVISOR') && <TablaDeChoferes/> }  
      {activeMenu === 'RegistroProveedor' && userRole === 'ADMINISTRADOR' && <RegistroProveedor/> }
      {activeMenu === 'PedidosAceptados' && userRole === 'ADMINISTRADOR' && <TablaPedidosAceptados/> }
      {activeMenu === 'Inconsistencias' && userRole === 'ADMINISTRADOR' && <Inconsistencias/> }
      {activeMenu === 'Usuarios' && userRole === 'ADMINISTRADOR' && <Usuarios/> }
      
     
      
      {activeMenu === 'Pedidos' && userRole === 'SUPERVISOR' && <TablaPedidosRealizados/> }  
      {activeMenu === 'Proveedores' && userRole === 'SUPERVISOR' && <TablaDeProveedores/> }  

      {activeMenu === 'Colectivos' && <TablaDeColectivos userRole={userRole} />} 
      {activeMenu === 'Mantenimientos' && <HistorialDeMantenimientos userRole={userRole} />} 

      {activeMenu === 'AsignarTarea' && userRole === 'OPERADOR' &&  <AsignarTareas/> } 
      {activeMenu === 'TareasAsignadas' && userRole === 'OPERADOR' &&  <TareasAsignadas/> } 
      {activeMenu === 'ScannerQR' && userRole === 'OPERADOR' &&  <ScannerQR/> } 

      {activeMenu === 'MetricaBitacora' && userRole === 'GERENTE' &&  <MetricaBitacora/> } 
      {activeMenu === 'MetricaStock' && userRole === 'GERENTE' && <MetricaStock/> } 
      {activeMenu === 'MetricaFlota' && userRole === 'GERENTE' && <MetricaFlota/> } 

      {activeMenu === 'CargarCombustible' && <CargarCombustible/> }
      
    </div>
  );
};

export default Principal;
