import React from "react";
type Order = {
  id: number;
  customer: string;
  total: number;
  status: "Pending" | "Completed" | "Cancelled";
};

const orders: Order[] = [
  { id: 1, customer: "John Doe", total: 99.99, status: "Pending" },
  { id: 2, customer: "Jane Smith", total: 149.5, status: "Completed" },
  { id: 3, customer: "Alice Johnson", total: 75.0, status: "Cancelled" },
];

type Props = {};

const Table = (props: Props) => {
  return (
    <div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total ($)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.total.toFixed(2)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap font-medium ${
                    order.status === "Pending"
                      ? "text-yellow-500"
                      : order.status === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
