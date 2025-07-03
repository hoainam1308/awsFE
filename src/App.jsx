import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <Router>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </div>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
