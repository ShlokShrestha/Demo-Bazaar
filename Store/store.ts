import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProductInCart = {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
};

export type Store = {
  products: ProductInCart[];
};

export type Actions = {
  addToCart: (newProduct: ProductInCart) => void;
  removeFromCart: (productId: number) => void;
  incrementProduct: (productId: number) => void;
  decrementProduct: (productId: number) => void;
  clearCart: () => void;
};

export const useProductStore = create<Store & Actions>()(
  persist(
    (set) => ({
      products: [],
      addToCart: (newProduct) =>
        set((state) => {
          const existanceProduct = state.products.find(
            (item: ProductInCart) => item.id === newProduct.id
          );
          if (existanceProduct) {
            return {
              products: state.products.map((item: ProductInCart) =>
                item.id == newProduct.id
                  ? { ...item, quantity: item.quantity + newProduct.quantity }
                  : item
              ),
            };
          } else {
            return { products: [...state.products, newProduct] };
          }
        }),
      removeFromCart: (productId) =>
        set((state) => {
          return {
            products: state.products.filter(
              (item: ProductInCart) => item.id !== productId
            ),
          };
        }),
      incrementProduct: (productId) =>
        set((state) => {
          return {
            products: state.products.map((item: ProductInCart) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }),
      decrementProduct: (productId) =>
        set((state) => {
          return {
            products: state.products.map((item: ProductInCart) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          };
        }),
      clearCart: () =>
        set(() => {
          return { products: [] };
        }),
    }),
    { name: "cartList" }
  )
);
