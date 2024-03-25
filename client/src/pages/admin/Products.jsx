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
        "http://localhost:8080/api/get-products"
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
      console.log("button clicked");
      const res = await axios.delete(
        `http://localhost:8080/api/delete-product/${id}`,
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
                      to={`/dashboard/admin/product/${item.slug}`}
                    >
                      <div className="card" style={{ width: "18rem" }}>
                        <img
                          src={`http://localhost:8080/api/product-photo/${item._id}`}
                          className="card-img-top center"
                          alt={item.name}
                          style={{
                            maxHeight: "200px",
                            maxWidth: "200px",
                          }}
                        />
                        <div className="card-body">
                          <h5 className="card-title mb-3">{item.name}</h5>
                          <p className="card-text">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
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
