// src/pages/PaymentSuccess.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import "./PaymentSuccess.css"; // nếu muốn style riêng

export default function PaymentSuccess() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("vnp_ResponseCode"); // ví dụ: 00 là thành công

  const isSuccess = code === "00";

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("cart"); // ✅ Xoá giỏ hàng nếu thanh toán thành công
    }
  }, [isSuccess]);

  return (
    <div className="payment-success-container">
      <h2>Kết quả thanh toán</h2>
      <p className={isSuccess ? "success-text" : "fail-text"}>
        {isSuccess ? "✅ Giao dịch thành công!" : "❌ Giao dịch thất bại."}
      </p>
      <Link to="/" className="btn-back">
        ← Về trang chủ
      </Link>
    </div>
  );
}
