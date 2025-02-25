import React from "react";
import Table from "../common/Table";

interface User {
  id: number;
  username: string;
  sessionActive: boolean;
}

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <Table headers={["ID", "Username", "Status", "Actions"]}>
      {users.map((user) => (
        <tr key={user.id} className="border-t">
          <td className="px-4 py-2 text-sm text-gray-700">{user.id}</td>
          <td className="px-4 py-2 text-sm text-gray-700">{user.username}</td>
          <td className="px-4 py-2 text-sm text-gray-700">
            {user.sessionActive ? (
              <span className="text-green-600">Active</span>
            ) : (
              <span className="text-red-600">Inactive</span>
            )}
          </td>
          <td className="px-4 py-2 text-sm text-gray-700">
            <button className="text-blue-600 hover:text-blue-800">
              Extend Session
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default UsersTable;