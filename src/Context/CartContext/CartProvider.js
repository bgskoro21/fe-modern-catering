import React, { useReducer } from "react";
import CartReducer, { initialState } from "./CartReducer";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export default CartProvider;
