import { executeFetch } from "./fetch";
import { HttpMethods } from "./HttpMethods";

/*
public class RegistrarItemDeInventarioDTO {
    private String nombre;
    private Integer umbral;
    private Integer stock;
}
*/
export const registrarItem = async (data, token) => {
    const endpoint = 'localhost:8080/inventario/registrarItem';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};

export const utilizarItem = async (id, token) => {
    const endpoint = 'localhost:8080/inventario/utilizarItem/' + id;
    return await executeFetch(endpoint, null, HttpMethods.PATCH, token, 200);
};