"use client";
import { useProductStore } from "@/Store/store";
import React from "react";
import { FaCreditCard } from "react-icons/fa";

type Props = {
  totalPrice: number;
  cartList: any;
  userId: string | undefined;
};

const EsewaPayment = ({ totalPrice, cartList, userId }: Props) => {
  const clearCart = useProductStore((state) => state.clearCart);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/payment/initiate-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "esewa",
        amount: totalPrice,
        productItems: cartList,
        userId,
      }),
    });
    const data = await res.json();
    if (data.esewaConfig) {
      clearCart();
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
      Object.entries(data.esewaConfig).forEach(([k, v]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = String(v);
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white ">
      <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg mb-5">
        <div className="flex items-center gap-3">
          <FaCreditCard className="text-green-600 text-2xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Amount</p>
            <p className="text-lg font-medium text-gray-800">Rs {totalPrice}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handlePayment}>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer"
        >
          <FaCreditCard />
          Pay with eSewa
        </button>
      </form>
      <p className="mt-4 text-xs text-gray-400 text-center">
        Secure payment powered by eSewa
      </p>
    </div>
  );
};

export default EsewaPayment;
