import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Button } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import avatar from '../../assets/Images/LogoNavBar.jpeg';
import EditUserForm from './EditUserForm'; 
import { habilitarUsuario, inhabilitarUsuario } from "../../services/authService";


const TablaUsuarios = ({ users, token }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [filas, setFilas] = useState(users); 
 

  useEffect(() => {
    setFilas(users);
  }, [users]);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = () => {
    setEditingUser(null);
  };

  const handleToggleEstado = async (user) => {
    const newState = user.estado === "HABILITADO" ? "INHABILITADO" : "HABILITADO";
    const id = user.id;
    try {
      if (newState === "HABILITADO") {
        await habilitarUsuario(id, token);
      } else {
        await inhabilitarUsuario(id, token);
      }
      setFilas((prevFilas) =>
        prevFilas.map((fila) => (fila.id === id ? { ...fila, estado: newState } : fila))
      );
    } catch (error) {
      alert("Error al cambiar el estado del usuario. Por favor, intente nuevamente.",error);
    }
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "username":
        return (
          <User
            avatarProps={{ radius: "lg", src: avatar }}
            description={`Role: ${user.role}`}
            name={cellValue}
          >
            {cellValue}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "estado":
        return (
          <Chip
            className="capitalize"
            color={user.estado === "HABILITADO" ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {user.estado}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="primary" content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleEdit(user)}>
                <EditIcon />
              </span>
            </Tooltip>
            <Button
              color={user.estado === "HABILITADO" ? "danger" : "success"}
              onClick={() => handleToggleEstado(user)}
            >
              {user.estado === "HABILITADO" ? "Inhabilitar" : "Habilitar"}
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const columns = [
    { uid: "username", name: "Username" },
    { uid: "role", name: "Role" },
    { uid: "estado", name: "ESTADO" },
    { uid: "actions", name: "Actions" },
  ];

  return (
    <>
      {editingUser ? (
        <EditUserForm
          user={editingUser}
          onSave={handleSave}
          onCancel={() => setEditingUser(null)}
          token={token}
        />
      ) : (
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={filas}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default TablaUsuarios;
