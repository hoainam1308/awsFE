import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">🛒 Danh sách sản phẩm</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={`http://localhost:3000${product.images}`}
              alt={product.productName}
              className="product-image"
            />
            <h2 className="product-name">{product.productName}</h2>
            <p className="product-price">{product.price.toLocaleString()}₫</p>
            <Link to={`/product/${product._id}`} className="product-link">
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
