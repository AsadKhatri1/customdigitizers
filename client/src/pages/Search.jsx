import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/Search";
import { Link } from "react-router-dom";
const Search = () => {
  const [value, setValue] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          {value.results.length < 1 ? (
            <h4 className="text-danger">
              No Products found related to this keyword
            </h4>
          ) : (
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
              {value?.results.map((item, index) => (
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
                          height: "16rem",
                          width: "17.9rem",
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
