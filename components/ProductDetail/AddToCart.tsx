"use client";
import { useProductStore } from "@/store/store";
import { Product } from "@/types/type";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddToCartProps {
  product: Product;
}

const AddToCart = ({ product }: AddToCartProps) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const addToCart = useProductStore((state) => state.addToCart);
  const handleAddToCartList = (product: Product) => {
    const itemList = {
      id: product.id,
      title: product.title,
      image: product.thumbnail,
      quantity: quantity,
      price: product.price,
    };
    addToCart(itemList);
    router.push("/");
  };
  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setQuantity((pre: number) => (pre > 1 ? pre - 1 : 1))}
          className="bg-gray-200 text-black px-3 py-1 rounded text-lg font-bold disabled:opacity-50 cursor-pointer"
          disabled={quantity === 1}
        >
          -
        </button>

        <span className="px-4 py-1 border rounded text-lg font-medium">
          {quantity}
        </span>

        <button
          onClick={() => setQuantity((pre: number) => pre + 1)}
          className="bg-gray-200 text-black px-3 py-1 rounded text-lg font-bold cursor-pointer"
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        onClick={() => handleAddToCartList(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
