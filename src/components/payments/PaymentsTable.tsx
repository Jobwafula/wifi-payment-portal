import React from "react";
import Table from "../common/Table";

interface Payment {
  id: number;
  amount: number;
  status: string;
}

interface PaymentsTableProps {
  payments: Payment[];
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ payments }) => {
  return (
    <Table headers={["ID", "Amount", "Status"]}>
      {payments.map((payment) => (
        <tr key={payment.id} className="border-t">
          <td className="px-4 py-2 text-sm text-gray-700">{payment.id}</td>
          <td className="px-4 py-2 text-sm text-gray-700">Ksh {payment.amount}</td>
          <td className="px-4 py-2 text-sm text-gray-700">
            {payment.status === "Successful" ? (
              <span className="text-green-600">{payment.status}</span>
            ) : payment.status === "Pending" ? (
              <span className="text-yellow-600">{payment.status}</span>
            ) : (
              <span className="text-red-600">{payment.status}</span>
            )}
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default PaymentsTable;