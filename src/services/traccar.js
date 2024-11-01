import { backendUrl } from '../connection/backUrl';
import {executeFetch} from '../connection/fetch'
import {HttpMethods} from '../connection/HttpMethods'

export const crearDispositivo = async (data, token) => {
    const endpoint = backendUrl + '/traccar/crearDispositivo';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};
