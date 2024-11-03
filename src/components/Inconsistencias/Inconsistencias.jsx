import React, { useEffect } from 'react';
import { verInconsistencias } from '../../services/traccar';
import { useSelector } from 'react-redux';

export const Inconsistencias = () => {
    const token = useSelector((state) => state.user.token);

    const data = {
        fecha: "2023-10-20T11:44:14.358167Z"
    }
    
    /*{
        fecha: new Date().toISOString(),
    };*/
    

    const fetchData = async () => {
        try {
            const response = await verInconsistencias(data, token);
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
