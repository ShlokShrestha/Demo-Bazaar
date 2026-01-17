"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import EsewaPayment from "@/components/CheckOut/EsewaPayment";
import KhaltiPayment from "@/components/CheckOut/KhaltiPayment";
import { useProductStore } from "@/Store/store";

const CheckoutPage = () => {
  const { user } = useUser();
  console.log(user);
  const [active, setActive] = useState<"esewa" | "khalti">("esewa");
  const totalPrice = useProductStore((state) => state.getTotalPrice());
  const productList = useProductStore((state) => state.products);
  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-4xl">
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
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Complete Your Payment
            </h2>
            <div className="h-px bg-gray-200 mb-4" />
            {active === "esewa" && <EsewaPayment />}
            {active === "khalti" && (
              <KhaltiPayment
                totalPrice={totalPrice}
                productList={productList}
                userId={user?.id}
              />
            )}
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            {active === "esewa" && (
              <>
                <div className="max-w-md mx-auto ">
                  <h2 className="text-xl font-bold mb-4 text-green-600 text-center">
                    eSewa Test Credentials
                  </h2>

                  <ul className="space-y-3 text-gray-700 text-sm">
                    <li className="bg-green-50 p-3 rounded-lg shadow-sm">
                      <span className="font-medium">eSewa ID:</span>{" "}
                      <span className="font-semibold text-green-600">
                        9806800001, 9806800002, 9806800003, 9806800004,
                        9806800005
                      </span>
                    </li>
                    <li className="bg-green-50 p-3 rounded-lg shadow-sm">
                      <span className="font-medium">Password:</span>{" "}
                      <span className="font-semibold text-green-600">
                        Nepal@123
                      </span>
                    </li>
                    <li className="bg-green-50 p-3 rounded-lg shadow-sm">
                      <span className="font-medium">MPIN:</span>{" "}
                      <span className="font-semibold text-green-600">1122</span>
                    </li>
                    <li className="bg-green-50 p-3 rounded-lg shadow-sm">
                      <span className="font-medium">Token:</span>{" "}
                      <span className="font-semibold text-green-600">
                        123456
                      </span>
                    </li>
                  </ul>

                  <div className="mt-6 text-center">
                    <p className="mb-2 text-gray-500 font-medium">
                      Learn more as a developer
                    </p>
                    <a
                      href="https://developer.esewa.com.np/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200"
                    >
                      View Developer Docs
                    </a>
                  </div>
                </div>
              </>
            )}
            {active === "khalti" && (
              <>
                <div className="max-w-md mx-auto bg-white ">
                  <h2 className="text-xl font-bold mb-4 text-purple-600 text-center">
                    Khalti Test Credentials
                  </h2>

                  <ul className="space-y-3 text-gray-700 text-sm">
                    <li className="bg-purple-50 p-3 rounded-lg shadow-sm">
                      <span className="font-medium">Khalti IDs:</span>{" "}
                      <span className="font-semibold text-purple-600">
                        9800000000, 9800000001, 9800000002, 9800000003,
                        9800000004, 9800000005
                      </span>
                    </li>
                    <li className="bg-purple-50 p-3 rounded-lg shadow-sm">
                      <span className="font-medium">MPIN:</span>{" "}
                      <span className="font-semibold text-purple-600">
                        1111
                      </span>
                    </li>
                    <li className="bg-purple-50 p-3 rounded-lg shadow-sm">
                      <span className="font-medium">OTP:</span>{" "}
                      <span className="font-semibold text-purple-600">
                        987654
                      </span>
                    </li>
                  </ul>

                  <div className="mt-6 text-center">
                    <p className="mb-2 text-gray-500 font-medium">
                      Learn more as a developer
                    </p>
                    <a
                      href="https://docs.khalti.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-200"
                    >
                      View Developer Docs
                    </a>
                  </div>
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
