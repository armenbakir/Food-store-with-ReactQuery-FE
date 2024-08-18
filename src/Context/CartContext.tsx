import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Food, ICartItem } from "@types";

const CartContext = createContext<{
  cartItems: ICartItem[];
  addToCart: (item: Food) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
}>({
  cartItems: [],
  addToCart: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const addToCart = (item: Food) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.item.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { item, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((cartItem) =>
          cartItem.item.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.item.id !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, decreaseQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
