import React, { useEffect } from 'react';
import { verInconsistencias } from '../../services/traccar';
import { useSelector } from 'react-redux';

export const Inconsistencias = () => {
    const token = useSelector((state) => state.user.token);

    
    const data = {
        fecha: new Date().toISOString() 
    };

    const fetchData = async () => {
        try {
            const response = await verInconsistencias(data, token);
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
