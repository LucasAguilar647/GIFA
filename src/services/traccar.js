import { backendUrl } from '../connection/backUrl';
import {executeFetch} from '../connection/fetch'
import {HttpMethods} from '../connection/HttpMethods'

export const crearDispositivo = async (data, token) => {
    const endpoint = backendUrl + '/traccar/crearDispositivo';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 200);
};

export const verDispositivos = async (token) => {
    const endpoint = backendUrl + '/traccar/getDispositivos';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

export const verInconsistencias = async (data,token) => {
    const endpoint = backendUrl + '/traccar/verInconsistenciasDeCombustible';
    return await executeFetch(endpoint, data, HttpMethods.GET, token, 200);
};