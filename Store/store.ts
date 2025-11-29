import { create } from "zustand";
import { persist } from "zustand/middleware";

export type productInCart = {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
};

export type Store = {
  products: productInCart[];
};

export type Actions = {
  addToCart: (newProduct: productInCart) => void;
  clearCart: () => void;
};

export const useProductStore = create<Store & Actions>()(
  persist(
    (set) => ({
      products: [],
      addToCart: (newProduct) =>
        set((state) => {
          const existanceProduct = state.products.find(
            (item: productInCart) => item.id === newProduct.id
          );
          if (existanceProduct) {
            return {
              products: state.products.map((item: productInCart) =>
                item.id == newProduct.id
                  ? { ...item, quantity: item.quantity + newProduct.quantity }
                  : item
              ),
            };
          } else {
            return { products: [...state.products, newProduct] };
          }
        }),
      clearCart: () =>
        set(() => {
          return { products: [] };
        }),
    }),
    { name: "cartList" }
  )
);
