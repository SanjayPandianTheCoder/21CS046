import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import axios from "axios";

function ProductList() {
  useEffect(() => {
    getRequest();
  });

  async function getRequest() {
    await fetch("http://localhost:3000/index.js")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  return (
    <div>
      <h1 className="my-3">Products</h1>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.id} className="list-group-item">
            <Link to={`/product/${product.id}`}>
              <div className="d-flex align-items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "80px", marginRight: "10px" }}
                />
                <div>
                  <h5>{product.name}</h5>
                  <p>Price: ${product.price}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
