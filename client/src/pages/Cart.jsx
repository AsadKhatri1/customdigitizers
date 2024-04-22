import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";
import { usePay } from "../context/Pay";
const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [pay, setPay] = usePay();

  // total price function
  const total = () => {
    let total = 0;
    cart.map((item, index) => {
      total = total + item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  // delete cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };

  // payment handler
  const makePayment = async () => {
    await setPay(true);
    const stripe = await loadStripe(
      "pk_test_51P6XxyRtBNrco18AhacyCF5CsbTbaGj9iceQsSpkhkwgfzZpJyqAnMDa762Kktw3sGIbGRXiHM0bt4q0gLoVxVUL00tYoCbx3g"
    );
    const body = {
      products: cart,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:8080/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      castObject.log(result.error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <h2 className="text-center bg-light">
            Hi, Welcome {auth?.user?.name}
          </h2>
          <div className="col-md-8">
            {cart.length < 1 ? (
              <h5 className="text-center">Your cart is empty</h5>
            ) : (
              <></>
            )}
            <table className="table table-responsive table-sm ">
              <tbody>
                {cart.map((item, i) => (
                  <tr style={{ borderBottom: "1px solid gray" }} key={item._id}>
                    <td className="w-25" style={{ verticalAlign: "middle" }}>
                      <img
                        src={`http://localhost:8080/api/product-photo/${item._id}`}
                        alt="cart image"
                        className="my-3"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td className="w-25" style={{ verticalAlign: "middle" }}>
                      <h5>{item.name.toUpperCase()}</h5>
                    </td>
                    <td className="w-25" style={{ verticalAlign: "middle" }}>
                      <h6>$ {item.price}</h6>
                    </td>
                    <td className="w-25" style={{ verticalAlign: "middle" }}>
                      <button
                        className="btn btn-danger px-2"
                        onClick={() => removeCartItem(item._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="col-md-4"
            // style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
          >
            <div
              className="mt-5 p-5 rounded "
              style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
            >
              <h2>Cart Summary</h2>

              <p>TOTAL | CHECKOUT | PAYMENT</p>
              <hr />
              <h5
                className="mt-2"
                style={{ color: "#344c5c", fontWeight: 600 }}
              >
                Total: {total()}
              </h5>
              <div className="mt-2">
                {/* <DropIn
                options={{ authorization: clientToken }}
                onInstance={(instance) => setInstance(instance)}
              ></DropIn> */}
                {/* <button
                className="btn btn-success"
                onClick={handlePayment}
                disabled={!auth?.user || !instance}
              >
                Make Payment
                
              </button> */}
                <button
                  className="btn btn-outline-success mt-3 w-100"
                  style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
                  onClick={makePayment}
                  disabled={cart.length < 1}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
