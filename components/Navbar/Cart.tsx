"use client";
import { useProductStore } from "@/Store/store";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const cartRef = useRef<any>(null);
  const [openCart, setOpenCart] = useState(false);

  const cartList = useProductStore((state) => state.products);
  const incrementProduct = useProductStore((state) => state.incrementProduct);
  const decrementProduct = useProductStore((state) => state.decrementProduct);
  const removeFromCart = useProductStore((state) => state.removeFromCart);

  const totalPrice = useProductStore((state) => state.getTotalPrice());

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setOpenCart(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="relative" ref={cartRef}>
      <button
        className="relative cursor-pointer pr-4 pt-2"
        onClick={() => setOpenCart((prev) => !prev)}
      >
        <FaShoppingCart size={20} />
        <span className="absolute -top-1 -right-1 bg-white text-black h-6 w-6 rounded-full text-center font-semibold">
          {cartList.length}
        </span>
      </button>

      {openCart && (
        <section className="absolute top-10 right-0 w-80 bg-white shadow-lg p-4 rounded text-black">
          <h2 className="text-lg font-bold mb-2">Your Cart</h2>
          {cartList.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            <ul>
              {cartList.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between mb-3 text-black"
                >
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price} x {item.quantity} = $
                      {item.price * item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-gray-200 px-3 py-1 text-lg rounded cursor-pointer"
                      onClick={() => decrementProduct(item.id)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="bg-gray-200 px-3 py-1 text-lg rounded cursor-pointer"
                      onClick={() => incrementProduct(item.id)}
                    >
                      +
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                    >
                      x
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cartList.length > 0 && (
            <div className="my-4 font-bold">Total: ${Number(totalPrice)}</div>
          )}
          <div className="text-center">
            <Link
              href="/checkout"
              className="font-medium bg-blue-700 py-2 px-4 rounded text-white"
            >
              Go to Checkout
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default Cart;
