import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import './styles/tablaGenerica.css'

export function TablaGenerica({ data, columns, renderCell, topContent }) {
  return (
    <div className="TableContainer">
      {topContent && <div className="mb-4">{topContent}</div>}
      <Table aria-label="Tabla Genérica" isHeaderSticky>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "acciones" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No hay datos disponibles"} items={data}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell 
                  data-label={columns.find(col => col.uid === columnKey)?.name}
                >
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TablaGenerica;
