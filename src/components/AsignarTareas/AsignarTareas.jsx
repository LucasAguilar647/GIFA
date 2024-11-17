import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { verMantenimientosPendientes, asignarMantenimiento } from "../../services/mantenimientoService"; 
import { useSelector } from "react-redux"; 
import { showsuccessAlert } from "../SweetAlert/SweetAlertSucces";
import { showErrorAlert } from "../SweetAlert/SweetAlertError";
import Loader from "../Loader/Loader";


const columns = [
  { uid: "patente", name: "Patente" },
  { uid: "asunto", name: "Asunto" },
  { uid: "actions", name: "Acciones" },
];

export function AsignarMantenimiento() {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.user.token);

  const fetchMantenimientosPendientes = async () => {
    try {
      const response = await verMantenimientosPendientes(token); 
      setMantenimientos(response.mantenimientos); 
    } catch (error) {
      console.error("Error al obtener los mantenimientos pendientes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMantenimientosPendientes(); 
  }, [token]); 

  const handleAsignarMantenimiento = async (mantenimiento) => {
    try {
      setIsLoading(true);
      
      await asignarMantenimiento(mantenimiento.id, token);
      
      await fetchMantenimientosPendientes();
  
      showsuccessAlert('¡Mantenimiento asignado!',`El mantenimiento fue asiganado correctamente`)
      
    } catch (error) {
      showErrorAlert(`No se pudo asignar mantenimiento`,error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
       <>
       <div className="flex justify-center items-center h-full">
         <Loader />
       </div>
       <div className="flex justify-center items-center h-full">
         <h2>Cargando proveedores...</h2>
       </div>
     </>
      ) : mantenimientos.length === 0 ? (  
        <p>No hay tareas pendientes.</p>
      ) : (
        <Table aria-label="Mantenimientos Pendientes">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={mantenimientos}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.vehiculo.patente}</TableCell> 
                <TableCell>{item.asunto}</TableCell> 
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleAsignarMantenimiento(item)}
                  >
                    Asignarme
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default AsignarMantenimiento;