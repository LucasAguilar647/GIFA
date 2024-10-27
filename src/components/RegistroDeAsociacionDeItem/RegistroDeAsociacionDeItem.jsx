import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import fetchProveedores from "../TablaProveedores/FetchProveedores";
import FetchItems from "../TablaProveedores/FetchItems";
import { useSelector } from "react-redux";
import { asociarProveedor } from "../../services/proveedoresYPedidosController";
import { showsuccessAlert } from "../SweetAlert/SweetAlertSucces";
import { showErrorAlert } from "../SweetAlert/SweetAlertError";
//import './styles/RegistroDeAsociacionDeItem.css' //me hace conflictos en los otros registros, revisar

export const RegistroDeAsociacionDeItem = ({ onCancel }) => {
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedProveedor, setSelectedProveedor] = useState("");
    const [proveedores, setProveedores] = useState([]);
    const [items, setItems] = useState([]);
    const token = useSelector((state) => state.user.token);
    const [formData, setFormData] = useState({
        precio: 0,
    });

    useEffect(() => {
        const obtenerDatosProveedores = async () => {
            try {
                await fetchProveedores(setProveedores, token);
            } catch (error) {
                console.error("Error al obtener proveedores:", error);
            }
        };

        obtenerDatosProveedores();
    }, [token]);

    useEffect(() => {
        const obtenerDatosItems = async () => {
            try {
                await FetchItems(setItems, token);
            } catch (error) {
                console.error("Error al obtener items:", error);
            }
        };

        obtenerDatosItems();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "precio" && value < 0) {
            alert('No se permiten valores negativos');
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!selectedProveedor || !selectedItem || formData.precio <= 0) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }


        const dataToSubmit = {
            ...formData,
            idItem: selectedItem,
            idProveedor: selectedProveedor,
        };

        try {
            await asociarProveedor(dataToSubmit, token);
            showsuccessAlert('¡Asociacion exitosa!', 'El item fue asociado correctamente')
            onCancel()
        } catch (error) {
            showErrorAlert('Error al asociar un item', error)
        }

    };

    return (
        <div>
            <h2>Asociar Nuevo Item</h2>
            <select className="select" onChange={(e) => setSelectedProveedor(e.target.value)} value={selectedProveedor}>
                <option value="">Selecciona un proveedor</option>
                {proveedores.map((proveedor) => (
                    <option key={proveedor.id} value={proveedor.id}>
                        {proveedor.nombre}
                    </option>
                ))}
            </select>

            <select className="select" onChange={(e) => setSelectedItem(e.target.value)} value={selectedItem}>
                <option value="">Selecciona un item</option>
                {items.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.nombre}
                    </option>
                ))}
            </select>


            <div className="form-group">
                <label className="label">
                    Precio:
                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        min="0"
                        required
                        className="input-field"
                    />
                </label>
            </div>
            <Button onClick={handleSubmit} color="primary">
                Asociar
            </Button>
            <Button onClick={onCancel} color="danger">
                Cancelar
            </Button>
        </div>
    );
};

export default RegistroDeAsociacionDeItem;
