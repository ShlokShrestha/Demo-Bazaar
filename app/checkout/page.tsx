"use client";

import EsewaPayment from "@/components/CheckOut/EsewaPayment";
import KhaltiPayment from "@/components/CheckOut/KhaltiPayment";
import { useProductStore } from "@/Store/store";
import React, { useState } from "react";

type Props = {};

const CheckoutPage = (props: Props) => {
  const [active, setActive] = useState<"esewa" | "khalti">("esewa");
  const totalPrice = useProductStore((state) => state.getTotalPrice());

  return (
    <div className="min-h-screen flex justify-center py-10">
      <div className="w-full max-w-4xl">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-6">Checkout</h1>

        {/* Tab selector */}
        <div className="bg-white border rounded-xl shadow-sm p-2 flex w-full max-w-md mx-auto mb-8 ">
          <button
            onClick={() => setActive("esewa")}
            className={`w-1/2 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              active === "esewa"
                ? "bg-green-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            eSewa
          </button>
          <button
            onClick={() => setActive("khalti")}
            className={`w-1/2 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              active === "khalti"
                ? "bg-purple-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Khalti
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <h2 className="font-semibold mb-3">
              {active === "esewa" ? "Pay with eSewa" : "Pay with Khalti"}
            </h2>
            <div className="h-px bg-gray-200 mb-4" />
            {active === "esewa" && <EsewaPayment />}
            {active === "khalti" && <KhaltiPayment totalPrice={totalPrice} />}
          </div>
          <div className="bg-gray-50 rounded-xl border shadow-sm p-5">
            {active === "esewa" && (
              <>
                <h2 className="font-semibold mb-3 text-green-600">
                  eSewa Test Credentials
                </h2>
                <ul className="space-y-1 text-sm">
                  <li>
                    eSewa ID: <b>9806800001–5</b>
                  </li>
                  <li>
                    Password: <b>Nepal@123</b>
                  </li>
                  <li>
                    MPIN: <b>1122</b>
                  </li>
                  <li>
                    Token: <b>123456</b>
                  </li>
                </ul>

                <a
                  href="https://developer.esewa.com.np/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-xs underline text-green-600"
                >
                  View Developer Docs
                </a>
              </>
            )}
            {active === "khalti" && (
              <>
                <h2 className="font-semibold mb-3 text-purple-600">
                  Khalti Test Credentials
                </h2>
                <ul className="space-y-1 text-sm">
                  <li>
                    Test IDs: <b>9800000000–5</b>
                  </li>
                  <li>
                    MPIN: <b>1111</b>
                  </li>
                  <li>
                    OTP: <b>987654</b>
                  </li>
                </ul>

                <div className="flex gap-2 mt-4">
                  <h1>Khalti Docs, vist</h1>
                  <a
                    href="https://docs.khalti.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block underline text-purple-600"
                  >
                    View Developer Docs
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
