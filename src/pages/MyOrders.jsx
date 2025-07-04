import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "./MyOrders.css"; // Giả sử bạn có file CSS này để định dạng

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Bước 1: Lấy danh sách đơn hàng
    axios
      .post(
        "http://localhost:3000/orders/mine",
        {},
        {
          withCredentials: true,
        }
      )
      .then(async (res) => {
        const rawOrders = res.data.data;

        // Bước 2: Với mỗi đơn hàng, gọi tiếp API chi tiết
        const detailedOrders = await Promise.all(
          rawOrders.map(async (order) => {
            try {
              const detailRes = await axios.get(
                `http://localhost:3000/orders/details/${order._id}`,
                { withCredentials: true }
              );
              return {
                ...order,
                products: detailRes.data.data, // gán chi tiết sản phẩm vào mỗi đơn
              };
            } catch (err) {
              console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
              return { ...order, products: [] }; // fallback nếu lỗi
            }
          })
        );

        setOrders(detailedOrders);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách đơn hàng:", err);
      });
  }, []);

  return (
    <div className="my-orders-container">
      <h2>Thông tin người dùng</h2>
      {user && (
        <p>
          👤 <strong>{user.name || user.email}</strong>
        </p>
      )}
      <h3>🧾 Danh sách đơn hàng của bạn</h3>
      {orders.length === 0 ? (
  <p>Không có đơn hàng nào.</p>
) : (
  <ul className="order-list">
    {orders.map((order, index) => (
      <li key={order._id} className="order-item">
        <strong>Đơn hàng #{index + 1}</strong> – Tổng:{" "}
        {order.totalPrice.toLocaleString()}₫ – Ngày:{" "}
        {new Date(order.createdAt).toLocaleDateString()}
        {order.products && order.products.length > 0 && (
          <ul className="product-orderlist">
            {order.products.map((item) => (
              <li key={item._id} className="product-item">
                <img
                  src={`http://localhost:3000${item.product.images}`}
                  alt={item.product.productName}
                  className="product-image"
                />
                <div className="product-info">
                  <a
                    href={`/product/${item.product._id}`}
                    className="product-link"
                  >
                    {item.product.productName}
                  </a>{" "}
                  × {item.quantity}
                </div>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
)}

    </div>
  );
}
