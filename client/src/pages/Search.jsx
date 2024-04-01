import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/Search";
import { Link } from "react-router-dom";
const Search = () => {
  const [value, setValue] = useSearch();
  return (
    <Layout>
      <h3>search</h3>
      <div className="container">
        <div className="text-center">
          {value.results.length < 1
            ? "No products Found"
            : `${value.results.length} products found`}

          <h5 className="mt-3">Products</h5>
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
    </Layout>
  );
};

export default Search;
