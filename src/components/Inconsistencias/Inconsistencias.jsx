import React, { useEffect } from 'react';
import { verInconsistencias } from '../../services/traccar';
import { useSelector } from 'react-redux';

export const Inconsistencias = () => {
    const token = useSelector((state) => state.user.token);

    
    const fecha = new Date().toISOString(); 

    console.log("Fecha actual en formato OffsetDateTime:", fecha);

    const fetchData = async () => {
        try {
            const response = await verInconsistencias(fecha, token); 
            console.log(response); 
        } catch (error) {
            console.error("Error fetching data: ", error);
        } 
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>Inconsistencias</div>
    );
};
