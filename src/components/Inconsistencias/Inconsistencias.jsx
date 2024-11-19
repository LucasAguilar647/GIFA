import React, { useState } from 'react';
import { verInconsistencias } from '../../services/traccar';
import { useSelector } from 'react-redux';
import TablaGenerica from '../TablaGenerica/TablaGenerica';
import './Inconsistencias.css';

export const Inconsistencias = () => {
    const token = useSelector((state) => state.user.token);
    const [filas, setFilas] = useState([]);

   
    const getStartOfDay = () => {
        const date = new Date();
        date.setHours(-3, 1, 0, 0); 
        return date.toISOString().slice(0, 16);  
    };

    
    const getEndOfDay = () => {
        const date = new Date();
        date.setHours(20, 59, 0, 0); 
        return date.toISOString().slice(0, 16);  
    };

    const formatISODate = (date) => {
        const d = new Date(date);
        return d.toISOString().split('.')[0] + 'Z'; 
    };

    const [from, setFrom] = useState(getStartOfDay());  
    const [to, setTo] = useState(getEndOfDay());   

    const fetchData = async () => {
        try {
            const formattedFrom = formatISODate(from);
            const formattedTo = formatISODate(to);

            const response = await verInconsistencias(formattedFrom, formattedTo, token);
            const formattedData = response.map((item, index) => ({
                key: index.toString(),
                responsable: item.nombresDeResponsables.join(", ") || "Sin asignar",
                patente: item.vehiculo.patente,
                kilometrajeRecorrido: item.kilometrajeRecorrido,
                litrosCargados: item.litrosCargados,
            }));
            setFilas(formattedData);
        } catch (error) {
            console.error("Error fetching data: ", error.response ? error.response.data : error.message);
        }
    };

    const handleFromChange = (e) => {
        setFrom(e.target.value);
    };

    const handleToChange = (e) => {
        setTo(e.target.value);
    };

    const columns = [
        { uid: "responsable", name: "Responsable" },
        { uid: "patente", name: "Patente" },
        { uid: "kilometrajeRecorrido", name: "Kilometraje Recorrido (km)" },
        { uid: "litrosCargados", name: "Litros Cargados" },
    ];

    const renderCell = (item, columnKey) => {
        return item[columnKey] !== undefined ? item[columnKey] : "-";
    };

    return (
        <div>
            <div>
                <label htmlFor="from" className="label">Fecha y Hora Inicio:</label>
                <input
                    type="datetime-local"
                    id="from"
                    value={from}
                    onChange={handleFromChange}
                    className="date-input"
                />
            </div>
            <div>
                <label htmlFor="to" className="label">Fecha y Hora Fin:</label>
                <input
                    type="datetime-local"
                    id="to"
                    value={to}
                    onChange={handleToChange}
                    className="date-input"
                />
            </div>
            <div>
                <button onClick={fetchData} className="search-button">Buscar</button>
            </div>
            <div>
                <TablaGenerica 
                    data={filas} 
                    columns={columns} 
                    renderCell={renderCell} 
                />
            </div>
        </div>
    );
};
