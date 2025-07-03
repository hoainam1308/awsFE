import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";
import { useAuth } from "../contexts/AuthContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      alert("Vui lòng đăng nhập để xem giỏ hàng.");
      navigate("/login");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, [user]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập trước.");
      return navigate("/login");
    }

    try {
      const orderPayload = {
        userId: user._id,
        items: cartItems.map((item) => ({
          productId: item._id,
          productName: item.productName,
          images: item.images,
          quantity: item.quantity,
          price: item.price,
        })),
        paymentMethod,
      };

      const response = await axios.post(
        "http://localhost:3000/orders/create",
        orderPayload,
        {
          withCredentials: true,
        }
      );
      console.log("Order created:", response.data);

      const order = response.data.data;
      if (paymentMethod === "vnpay") {
        const payRes = await axios.post(
          "http://localhost:3000/vnpay/create_payment_url",
          {
            amount: totalAmount,
            orderId: order._id,
          }
        );
        window.location.href = payRes.data.data;
      } else {
        alert("Đặt hàng thành công!");
        localStorage.removeItem("cart");
        navigate("/");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Có lỗi xảy ra khi thanh toán.");
    }
  };

  const handleRemoveItem = (indexToRemove) => {
    const newCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Không có sản phẩm trong giỏ hàng.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div>
                  <img
                    src={`http://localhost:3000${item.images}`}
                    alt={item.productName}
                    className="cart-image"
                  />
                  <h3 className="item-name">{item.productName}</h3>
                  <p className="item-qty">Số lượng: {item.quantity}</p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(index)}
                  >
                    ❌ Xoá
                  </button>
                </div>
                <div className="item-total">
                  {(item.price * item.quantity).toLocaleString()}₫
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <p>
              Tổng cộng: <span>{totalAmount.toLocaleString()}₫</span>
            </p>
          </div>

          <div className="payment-method">
            <label>Phương thức thanh toán:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cod">Thanh toán khi nhận hàng (COD)</option>
              <option value="vnpay">Thanh toán qua VNPAY</option>
            </select>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            ✅ Thanh toán
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
