import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
} from "@nextui-org/react";
import { VerDetalleColectivo } from '../VerDetalleColectivo/VerDetalleColectivo';
import { AsignarOperador } from '../AsignarOperador/AsignarOperador';

const columns = [
  { uid: "patente", name: "PATENTE" },
  { uid: "chasis", name: "CHASIS" },
  { uid: "antiguedad", name: "ANTIGÜEDAD" },
  { uid: "kilometraje", name: "KILOMETRAJE" },
  { uid: "litrosTanque", name: "LITROS DE TANQUE" },
  { uid: "estado", name: "ESTADO" },
  { uid: "chofer", name: "CHOFER" },
  { uid: "actions", name: "ACCIONES" },
];

export function TablaDeColectivos({ userRole }) {
  const [filas, setFilas] = useState([]);
  const [selectedColectivo, setSelectedColectivo] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [asignarOperador, setAsignarOperador] = useState(false);
  const [colectivoParaAsignar, setColectivoParaAsignar] = useState(null); 

  useEffect(() => {
    const mockData = [
      { patente: "ABC123", chasis: "XYZ456", antiguedad: 5, kilometraje: 150000, litrosTanque: 800, estado: "No disponible", chofer: "Juan Pérez" },
      { patente: "DEF456", chasis: "UVW789", antiguedad: 3, kilometraje: 80000, litrosTanque: 800, estado: "Disponible", chofer: "Ana Gómez" },
      { patente: "GHI789", chasis: "RST012", antiguedad: 8, kilometraje: 200000, litrosTanque: 800, estado: "No disponible", chofer: "Carlos Martínez" },
      { patente: "JKL012", chasis: "OPQ345", antiguedad: 2, kilometraje: 50000, litrosTanque: 800, estado: "Disponible", chofer: "Lucía Fernández" },
      { patente: "ABC123", chasis: "XYZ456", antiguedad: 5, kilometraje: 150000, litrosTanque: 800, estado: "No disponible", chofer: "Juan Pérez" },
      { patente: "DEF456", chasis: "UVW789", antiguedad: 3, kilometraje: 80000, litrosTanque: 800, estado: "Disponible", chofer: "Ana Gómez" },
      { patente: "GHI789", chasis: "RST012", antiguedad: 8, kilometraje: 200000, litrosTanque: 800, estado: "No disponible", chofer: "Carlos Martínez" },
      { patente: "JKL012", chasis: "OPQ345", antiguedad: 2, kilometraje: 50000, litrosTanque: 800, estado: "Disponible", chofer: "Lucía Fernández" },
      { patente: "ABC123", chasis: "XYZ456", antiguedad: 5, kilometraje: 150000, litrosTanque: 800, estado: "No disponible", chofer: "Juan Pérez" },
      { patente: "ABC123", chasis: "XYZ456", antiguedad: 5, kilometraje: 150000, litrosTanque: 800, estado: "No disponible", chofer: "Juan Pérez" },
      { patente: "DEF456", chasis: "UVW789", antiguedad: 3, kilometraje: 80000, litrosTanque: 800, estado: "Disponible", chofer: "Ana Gómez" },  
    ];

    const mappedRows = mockData.map((item, index) => ({
      key: index.toString(),
      ...item,
    }));

    setFilas(mappedRows);
  }, []);

  const handleVerDetalle = (colectivo) => {
    setSelectedColectivo(colectivo);
  };

  const handleIrAtras = () => {
    setSelectedColectivo(null);
  };

  const handleEditar = () => {
    alert('Función para editar colectivo');
  };

  const handleFilterByStatus = (status) => {
    setFilterStatus(status);
  };

  const filteredRows = useMemo(() => {
    return filas.filter(row => 
      (filterStatus === "all" || row.estado === filterStatus) &&
      row.patente.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filas, filterValue, filterStatus]);

  const topContent = (
    <div className="flex justify-between items-end mb-4">
      <Input
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Buscar por patente..."
        value={filterValue}
        onClear={() => setFilterValue("")}
        onValueChange={setFilterValue}
      />
      <div className="flex gap-2">
        <Button onClick={() => handleFilterByStatus("all")}>Todos</Button>
        <Button onClick={() => handleFilterByStatus("Disponible")}>Disponibles</Button>
        <Button onClick={() => handleFilterByStatus("No disponible")}>No Disponibles</Button>
      </div>
    </div>
  );

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "estado":
        return (
          <Chip className="capitalize" color={cellValue === "Disponible" ? "success" : "danger"} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex justify-end items-center gap-2">
            <Button onClick={() => handleVerDetalle(item)}>Ver detalle</Button>
            {userRole === "admin" && (
              <Button color="danger" onClick={() => console.log(`Eliminar: ${item.patente}`)}>Eliminar</Button>
            )}
            {item.estado === "No disponible" && (
            <Button 
              color="warning" 
              onClick={() => { 
                setColectivoParaAsignar(item); 
                setAsignarOperador(true); 
              }}>
                Asignar Operador
              </Button>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div>
      {asignarOperador ? ( 
        <AsignarOperador colectivo={colectivoParaAsignar} onClose={() => setAsignarOperador(false)} />
      ) : selectedColectivo ? ( 
        <VerDetalleColectivo colectivo={selectedColectivo} irAtras={handleIrAtras} editar={handleEditar} />
      ) : (
        <Table
          aria-label="Tabla de Colectivos"
          isHeaderSticky
          topContent={topContent}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No hay colectivos encontrados"} items={filteredRows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default TablaDeColectivos;




/*export function TablaDeColectivos() {
const [rows, setRows] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/colectivos'); 
      const data = response.data;

      
      const mappedRows = data.map((item, index) => ({
        key: index.toString(),
        patente: item.patente,
        chasis: item.chasis,
        antiguedad: item.antiguedad,
        kilometraje: item.kilometraje,
        litrosTanque: item.litrosTanque || 800,
        chofer: item.chofer,
      }));

      setRows(mappedRows);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  fetchData();
}, []);*/