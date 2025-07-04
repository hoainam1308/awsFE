import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import MyOrders from "./pages/MyOrders";
import PaymentSuccess from "./pages/PaymentSuccess";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
        <Router>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
            </Routes>
          </div>
        </Router>
    </AuthProvider>
  );
};

export default App;
