import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { price } from "../components/Prices";
import SearchInput from "../components/reusables/SearchInput";
import { toast } from "react-toastify";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  //  getting all categories available
  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        "https://customdigitizers-rk58.onrender.com/api/get-categories"
      );
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
        "https://customdigitizers-rk58.onrender.com/api/get-products"
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
        `https://customdigitizers-rk58.onrender.com/api/product-filter`,
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
              {products.length < 1 ? (
                <h2 className="text-danger">No Products To SHow</h2>
              ) : (
                <></>
              )}
              {products?.map((item, index) => (
                <div className="d-flex flex-column my-2" key={item._id}>
                  {/* <Link
                    className="product_link"
                    key={item._id}
                    to={`/product/${item.slug}`}
                  > */}
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={`https://customdigitizers-rk58.onrender.com/api/product-photo/${item._id}`}
                      className="card-img-top"
                      alt={item.name}
                      style={{
                        height: "16rem",
                        width: "17.9rem",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title mb-3 fw-bold">{item.name}</h5>

                      <p>${item.price}</p>

                      <p className="opacity-75">{item.category.name}</p>

                      <button
                        className="btn btn-dark ms-1"
                        onClick={() => navigate(`/product/${item.slug}`)}
                      >
                        More details
                      </button>

                      <button
                        className="btn btn-success ms-1"
                        onClick={() => {
                          setCart([...cart, item]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, item])
                          );
                          toast.success("Item added to cart successfully");
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
