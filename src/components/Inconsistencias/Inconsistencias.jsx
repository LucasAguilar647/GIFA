import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        fetchData();
    }, [fecha]);

    const handleFechaChange = (e) => {
        const selectedDate = e.target.value;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        
        if (dateRegex.test(selectedDate)) {
            setFecha(selectedDate);
        } else {
            console.error("La fecha ingresada no tiene el formato correcto (YYYY-MM-DD)");
        }
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
                    pattern="\d{4}-\d{2}-\d{2}"
                    className="date-input"
                />
            </div>
            <div>
                <TablaGenerica data={filas} columns={columns} />
            </div>
        </div>
    );
};
