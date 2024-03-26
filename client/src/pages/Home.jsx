import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/Auth.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // getting all categories
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/get-products"
      );
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container my-5 " style={{ height: "auto" }}>
        <div className="row" style={{ height: "auto" }}>
          <div className="col-md-3">
            <h6>Filter By Category</h6>
          </div>
          <div className="col-md-9">
            <h2 className="fw-bold">All Products</h2>
            {/* showing all products */}

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
                          height: "200px",
                          width: "200px",
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title mb-3 fw-bold">{item.name}</h5>
                        <p>${item.price}</p>
                        <p className="opacity-75">{item.category.name}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
