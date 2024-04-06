import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
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
              {/* <thead className="thead-dark my-3">
                <tr>
                  <td>
                    <h3>PHOTO</h3>
                  </td>
                  <td>
                    <h3>NAME</h3>
                  </td>
                  <td>
                    <h3>PRICE</h3>
                  </td>
                </tr>
              </thead> */}
              <tbody>
                {cart.map((item, i) => (
                  <tr style={{ borderBottom: "1px solid gray" }}>
                    <td className="w-50" style={{ verticalAlign: "middle" }}>
                      <img
                        src={`http://localhost:8080/api/product-photo/${item._id}`}
                        alt="cart image"
                        className="my-3"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td className="w-25" style={{ verticalAlign: "middle" }}>
                      <h5>{item.name}</h5>
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
          <div className="col-md-4 mt-5">
            <h2>Cart Summary</h2>

            <p>TOTAL | CHECKOUT | PAYMENT</p>
            <hr />
            <h3>Total: {total()}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
