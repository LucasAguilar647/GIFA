import React, { useState } from 'react';
import { verInconsistencias } from '../../services/traccar';
import { useSelector } from 'react-redux';
import TablaGenerica from '../TablaGenerica/TablaGenerica';
import './Inconsistencias.css';

export const Inconsistencias = () => {
    const token = useSelector((state) => state.user.token);
    const [filas, setFilas] = useState([]);
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

    const fetchData = async () => {
        try {
            const response = await verInconsistencias(fecha, token);
            const formattedData = response.map((item, index) => ({
                key: index.toString(),
                responsable: item.nombresDeResponsables.join(", ") || "Sin asignar",
                patente: item.vehiculo.patente,
                kilometrajeRecorrido: item.kilometrajeRecorrido,
                litrosCargados: item.litrosCargados,
                litrosInconsistente: item.litrosInconsistente,
            }));
            setFilas(formattedData);
        } catch (error) {
            console.error("Error fetching data: ", error.response ? error.response.data : error.message);
        }
    };

    const handleFechaChange = (e) => {
        setFecha(e.target.value);
    };

    const columns = [
        { uid: "responsable", name: "Responsable" },
        { uid: "patente", name: "Patente" },
        { uid: "kilometrajeRecorrido", name: "Kilometraje Recorrido (km)" },
        { uid: "litrosCargados", name: "Litros Cargados" },
        { uid: "litrosInconsistente", name: "Litros Inconsistente" }
    ];

    return (
        <div>
            <div>
                <label htmlFor="fecha" className="label">Fecha:</label>
                <input
                    type="date"
                    id="fecha"
                    value={fecha}
                    onChange={handleFechaChange}
                    className="date-input"
                />
            </div>
            <div>
                <button onClick={fetchData} className="search-button">Buscar</button>
            </div>
            <div>
                <TablaGenerica data={filas} columns={columns} />
            </div>
        </div>
    );
};
