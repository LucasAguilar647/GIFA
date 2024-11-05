import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import avatar from '../../assets/Images/LogoNavBar.jpeg';
import EditUserForm from './EditUserForm'; 
import IconSwitch from "./SwitchIcon";

const TablaUsuarios = ({ users, token }) => {
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = () => {
    setEditingUser(null); 
    
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
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="primary" content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleEdit(user)}>
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Cambiar estado">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <IconSwitch/>
              </span>
            </Tooltip>
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
          <TableBody items={users}>
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
