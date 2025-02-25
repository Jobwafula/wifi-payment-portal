import React from "react";
import Card from "../common/Card";
import UsersTable from "./UsersTable";

const Users: React.FC = () => {
  // Mock user data
  const users = [
    { id: 1, username: "user1", sessionActive: true },
    { id: 2, username: "user2", sessionActive: false },
    { id: 3, username: "user3", sessionActive: true },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Users Management</h2>
      <Card>
        <UsersTable users={users} />
      </Card>
    </div>
  );
};

export default Users;