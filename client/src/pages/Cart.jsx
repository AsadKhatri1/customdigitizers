import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <h2 className="text-center bg-light">
            Hi, Welcome {auth?.user.name}
          </h2>
          <div className="col-md-12">
            {cart.map((item, i) => (
              <h3 key={i}>{item.name}</h3>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
