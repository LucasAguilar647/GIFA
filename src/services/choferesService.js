import { backendUrl } from '../connection/backUrl';
import { executeFetch } from '../connection/fetch';
import { HttpMethods } from '../connection/HttpMethods';

/*
public class ChoferRegistroDTO {
    String username;
    String password;
    String nombre;
}
*/
export const registrarChofer = async (data, token) => {
    const endpoint = backendUrl + '/chofer/registrar';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};

/*
public class AsignarChoferDTO {
    Integer idVehiculo;
    Integer idChofer;
}
*/
export const asignarChofer = async (data, token) => {
    const endpoint = backendUrl + '/chofer/asignar'; 
    return await executeFetch(endpoint, data, HttpMethods.PATCH, token, 200);
};


export const habilitarChofer = async (id, token) => { 
    const endpoint = backendUrl + '/chofer/habilitar/' + id;
    return await executeFetch(endpoint, null, HttpMethods.PATCH, token, 200);
};


export const inhabilitarChofer = async (id, token) => { 
    const endpoint = backendUrl + '/chofer/inhabilitar/' + id;
    return await executeFetch(endpoint, null, HttpMethods.PATCH, token, 200);
};

export const verChoferes = async (token) => {
    const endpoint = backendUrl + '/chofer/verChoferes';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};
