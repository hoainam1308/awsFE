import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css"; // CSS riêng
import { useAuth } from "../contexts/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const { user } = useAuth();

  const addToCart = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate("/login");
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        _id: product._id,
        productName: product.productName,
        price: product.price,
        images: product.images,
        quantity,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
    console.log("Sản phẩm đã được thêm vào giỏ hàng:", product.productName);
  };

  if (!product) return <div className="loading">Đang tải sản phẩm...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img
          src={`http://localhost:3000${product.images}`}
          alt={product.productName}
        />
      </div>
      <div className="product-info">
        <h2>{product.productName}</h2>
        <p className="description">{product.description}</p>
        <p className="price">{product.price.toLocaleString()} ₫</p>
        <div className="quantity-section">
          <label htmlFor="quantity">Số lượng:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
          />
        </div>
        <button className="add-cart-btn" onClick={addToCart}>
          🛒 Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
