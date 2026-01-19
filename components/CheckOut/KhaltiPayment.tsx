import { useProductStore } from "@/Store/store";
import React from "react";
import { FaCreditCard } from "react-icons/fa";

type Props = {
  totalPrice: number;
  cartList: any;
  userId: string | undefined;
};

const KhaltiPayment = ({ totalPrice, cartList, userId }: Props) => {
  const clearCart = useProductStore((state) => state.clearCart);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/payment/initiate-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "khalti",
        amount: totalPrice,
        productItems: cartList,
        userId,
      }),
    });
    const data = await res.json();
    if (data.paymentUrl) {
      clearCart();
      window.location.href = data.paymentUrl;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white ">
      <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg mb-5">
        <div className="flex items-center gap-3">
          <FaCreditCard className="text-purple-600 text-2xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Amount</p>
            <p className="text-lg font-medium text-gray-800">Rs {totalPrice}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handlePayment}>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer"
        >
          <FaCreditCard />
          Pay with Khalti
        </button>
      </form>
      <p className="mt-4 text-xs text-gray-400 text-center">
        Secure payment powered by Khalti
      </p>
    </div>
  );
};

export default KhaltiPayment;
