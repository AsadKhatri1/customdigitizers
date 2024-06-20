import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const Users = () => {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useAuth();
  // get all products
  const getAllProducts = async () => {
    try {
      const productList = await axios.get(
        "https://customdigitizers-rk58.onrender.com/api/get-products"
      );
      setProducts(productList.data.products);
    } catch (err) {
      toast.error("Error in fetching products");
    }
  };

  // useeffect to call this function
  useEffect(() => {
    getAllProducts();
  }, []);

  // deleting a product

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete the product?"
      );
      if (!answer) {
        return;
      }
      const res = await axios.delete(
        `https://customdigitizers-rk58.onrender.com/api/delete-product/${id}`,
        {
          headers: {
            Authorization: await auth.token,
          },
        }
      );
      if (res.data.success) {
        toast.success(`product is deleted`);
        getAllProducts();
      }
    } catch (err) {
      toast.error("Error in deleting product");
    }
  };

  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center">
        <div className="container m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9 px-2">
              <h2 className="fw-bold">All Products</h2>

              <div
                className="main-products w-100 h-100"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "start",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                }}
              >
                {products.map((item, index) => (
                  <div className="d-flex flex-column my-2">
                    <Link
                      className="product_link"
                      key={item._id}
                      to={`/product/${item.slug}`}
                    >
                      <div className="card" style={{ width: "18rem" }}>
                        <img
                          src={`https://customdigitizers-rk58.onrender.com/api/product-photo/${item._id}`}
                          className="card-img-top center"
                          alt={item.name}
                          style={{
                            height: "200px",
                            width: "200px",
                          }}
                        />
                        <div className="card-body">
                          <h5 className="card-title mb-3 fw-bold">
                            {item.name}
                          </h5>
                          <p>${item.price}</p>
                          <p className="opacity-75">{item.category.name}</p>
                        </div>
                      </div>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
