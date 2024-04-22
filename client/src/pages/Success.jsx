import React, { useState, useEffect } from "react";
import { IoMdCloudDownload } from "react-icons/io";
import { IoArrowUndoSharp } from "react-icons/io5";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import { usePay } from "../context/Pay";
const Success = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [pay, setPay] = usePay();
  const navigate = useNavigate();
  const emptyHandler = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setPay(false);
  };

  // useEffect(() => {
  //   if (pay === false) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    // <Layout>
    <div className="container">
      <div className="row">
        <h2 className="text-center bg-light mt-5 py-3 rounded">
          Welcome back {auth?.user?.name}, download your files now
        </h2>
        <div className="col-md-12">
          {cart.length < 1 ? (
            <h5 className="text-center">Your download list is empty</h5>
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
                    <h6>$ {item.price}</h6>
                  </td>
                  <td className="w-25" style={{ verticalAlign: "middle" }}>
                    <a
                      className="btn btn-success py-1 px-4"
                      href={`http://localhost:8080/api/product-photo/${item._id}`}
                      download={`${item.name}.jpeg`}
                    >
                      <IoMdCloudDownload className="mx-2" /> Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div
            className="col-md-4"
            // style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
          ></div> */}
      </div>
      <div className="links d-flex align-items-center justify-content-end">
        <span>
          Don't go back to home, if you have not yet downloaded the files
        </span>
        <NavLink className="btn btn-dark mx-3" to="/" onClick={emptyHandler}>
          <IoArrowUndoSharp className="mx-2" />
          Home
        </NavLink>
      </div>
    </div>

    // </Layout>
  );
};

export default Success;
