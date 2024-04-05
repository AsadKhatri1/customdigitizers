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
            <table className="table ">
              {cart.map((item, i) => (
                <tr>
                  <td className="border">
                    <img
                      src={`http://localhost:8080/api/product-photo/${item._id}`}
                      alt="cart image"
                      className="my-3"
                      style={{ width: "130px", height: "130px" }}
                    />
                  </td>
                  <td>
                    <h6>{item.name}</h6>
                  </td>
                  <td>
                    <h6>$ {item.price}</h6>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
