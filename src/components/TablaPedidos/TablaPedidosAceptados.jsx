import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from 'react-redux';
import Loader from "../Loader/Loader";
import { Input, Button, Chip } from "@nextui-org/react";
import TablaGenerica from "../TablaGenerica/TablaGenerica";
import { confirmarPedidoRecibido, verPedidosAceptados } from "../../services/proveedoresYPedidosController";

const columns = [
    { uid: "nombre", name: "NOMBRE" },
    { uid: "fecha", name: "FECHA" },
    { uid: "cantidad", name: "CANTIDAD" },
    { uid: "motivo", name: "MOTIVO" },
    { uid: "estado", name: "ESTADO" },
    { uid: "acciones", name: "ACCIONES" },
];

export function TablaPedidosAceptados() {
    const [filas, setFilas] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.user.token);


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await verPedidosAceptados(token);
            console.log(response)
            if (response) {
                const mappedRows = response.map((item, index) => ({
                    key: index.toString(),
                    id: item.id, 
                    nombre: item.item,
                    fecha: item.fecha ? new Date(item.fecha[0], item.fecha[1] - 1, item.fecha[2]).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : "Sin fecha",
                    cantidad: item.cantidad,
                    motivo: item.motivo,
                    estado: item.estadoPedido,
                }));
                
                setFilas(mappedRows);
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    };


    const confirmarPedido = async (id) => {
    
        try {
            await confirmarPedidoRecibido(id, token);
            alert("Pedido confirmado exitosamente.");
            fetchData(); 
        } catch (error) {
            alert("Error al confirmar el pedido. Por favor, intente nuevamente.");
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const filteredRows = useMemo(() => 
        filas.filter((fila) => fila.nombre.toLowerCase().includes(filterValue.toLowerCase())), 
        [filas, filterValue]
    );

    const topContent = (
        <div className="flex justify-between items-end mb-4">
            <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Buscar por nombre..."
                value={filterValue}
                onClear={() => setFilterValue("")}
                onValueChange={setFilterValue}
            />
        </div>
    );

    const renderCell = (item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case "estado":
                return (
                    <Chip className="capitalize" color="success" size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "acciones":
                return (
                    <Button color="success" size="sm" onClick={() => confirmarPedido(item.id)}>
                        Confirmar
                    </Button>
                );
            default:
                return cellValue;
        }
    };

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Loader />
                    <h2>Cargando pedidos aceptados...</h2>
                </div>
            ) : (
                <TablaGenerica
                    data={filteredRows}
                    columns={columns}
                    renderCell={renderCell}
                    topContent={topContent}
                />
            )}
        </div>
    );
}

export default TablaPedidosAceptados;