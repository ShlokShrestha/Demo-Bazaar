import React, { useState } from "react";

type Props = {
  totalPrice: number;
};

const KhaltiPayment = ({ totalPrice }: Props) => {
  const [productName, setProductName] = useState("Test Product");
  const [transactionId, setTransactionId] = useState("txn-456");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/payment/initiate-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "khalti",
        amount: totalPrice,
        productName,
        transactionId,
      }),
    });
    const data = await res.json();
    if (data.khaltiPaymentUrl) {
      console.log(data);
      window.location.href = data.khaltiPaymentUrl;
    }
  };
  return (
    <div>
      <form onSubmit={handlePayment}>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Amount: {totalPrice}</label>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Transaction ID</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter transaction ID"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition duration-200 cursor-pointer"
        >
          Pay with Khalti
        </button>
      </form>
    </div>
  );
};

export default KhaltiPayment;
