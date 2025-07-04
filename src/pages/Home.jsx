import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    // Lấy danh sách category nếu có
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        const raw = res.data.data;
        setProducts(raw);
        const uniqueCategories = [
          ...new Map(raw.map((p) => [p.category._id, p.category])).values(),
        ];
        setAllCategories(uniqueCategories);
      })
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  // Lọc sản phẩm mỗi khi keyword hoặc category thay đổi
  const filtered = products.filter((product) => {
    const matchKeyword = product.productName
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchCategory = category
      ? product.category?.categoryName === category
      : true;
    return matchKeyword && matchCategory;
  });

  return (
    <div className="home-container">
      <h1 className="home-title">🛒 Danh sách sản phẩm</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Tìm sản phẩm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Tất cả danh mục</option>
          {allCategories.map((cat) => (
            <option key={cat._id} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
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
