import { useState, useContext, createContext, useEffect } from "react";
// initializing createContext
const CartContext = createContext();

const CartProvider = (props) => {
  // initializing the data that is to be used all over the app
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      setCart(JSON.parse(existingCartItem));
    }
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};

// custom hook to be used anywhere

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
