import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { price } from "../components/Prices";
import SearchInput from "../components/reusables/SearchInput";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //  getting all categories available
  const getAllCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/get-categories");
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // getting all products
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
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // function for category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // getting filtered products
  const filteredProducts = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/product-filter`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filteredProducts();
  }, [checked, radio]);

  return (
    <Layout>
      <div className="container my-5 ">
        <div className="row">
          <div className="col-md-3 mb-5">
            <h2 className="mb-5">Filter</h2>
            <h5 className="mb-3">Category</h5>

            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}

            <h5 className="my-3">Price</h5>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {price.map((p) => (
                <Radio key={p.id} value={p.array}>
                  {p.name}
                </Radio>
              ))}
            </Radio.Group>
            <button
              className="my-5 btn btn-dark w-100"
              onClick={() => window.location.reload()}
            >
              Clear Filters
            </button>
          </div>

          <div className="col-md-9">
            <SearchInput />

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
              {products?.map((item, index) => (
                <div className="d-flex flex-column my-2">
                  <Link
                    className="product_link"
                    key={item._id}
                    to={`/product/${item.slug}`}
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

                        <button className="btn btn-dark ms-1">
                          More details
                        </button>

                        <button className="btn btn-success ms-1">
                          Add To Cart
                        </button>
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
