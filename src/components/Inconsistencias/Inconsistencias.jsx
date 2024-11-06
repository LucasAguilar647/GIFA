import React, { useEffect } from 'react';
import { verInconsistencias } from '../../services/traccar';
import { useSelector } from 'react-redux';

export const Inconsistencias = () => {
    const token = useSelector((state) => state.user.token);

    const formattedDate = new Date().toISOString().split('T')[0];

    const fetchData = async () => {
        try {
            const response = await verInconsistencias(formattedDate, token);
            console.log("Response:", response); 
        } catch (error) {
            console.error("Error fetching data: ", error.response ? error.response.data : error.message);
        } 
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>Inconsistencias</div>
    );
};
