"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

type OrderItem = {
  id: number;
  price: number;
  title: string;
  quantity: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  transactionId: string;
  userId: string;
  purchaseDate: string;
  paymentMethod: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
};

type PageInfo = {
  total: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

type ApiResponse = {
  success: boolean;
  results: Order[];
  pageInfo: PageInfo;
};

type OrdersTableProps = {
  orderData: ApiResponse;
};

const OrdersTable: React.FC<OrdersTableProps> = ({ orderData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!orderData || !orderData.results) {
    return <div>Loading orders...</div>;
  }

  const page = orderData.pageInfo.page;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total ($)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orderData.results.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order.items
                  .map((item) => `${item.title} x${item.quantity}`)
                  .join(", ")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order.totalPrice.toFixed(2)}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap font-medium ${
                  order.status === "PENDING"
                    ? "text-yellow-500"
                    : order.status === "COMPLETED"
                      ? "text-green-500"
                      : "text-red-500"
                }`}
              >
                {order.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order.transactionId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(order.purchaseDate).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={!orderData.pageInfo.hasPrevPage}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {orderData.pageInfo.page} of{" "}
          {Math.ceil(orderData.pageInfo.total / orderData.results.length)}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!orderData.pageInfo.hasNextPage}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;
