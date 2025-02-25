import React, { ReactNode } from "react";

interface TableProps {
  headers: string[];
  children: ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="px-4 py-2 text-left text-sm font-medium text-gray-500"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;