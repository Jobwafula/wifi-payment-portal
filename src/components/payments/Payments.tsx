import React from "react";
import Card from "../common/Card";
import PaymentsTable from "./PaymentsTable";

const Payments: React.FC = () => {
  // Mock payment data
  const payments = [
    { id: 1, amount: 100, status: "Successful" },
    { id: 2, amount: 200, status: "Pending" },
    { id: 3, amount: 150, status: "Failed" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Payments Management</h2>
      <Card>
        <PaymentsTable payments={payments} />
      </Card>
    </div>
  );
};

export default Payments;