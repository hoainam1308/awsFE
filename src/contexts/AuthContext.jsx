import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  // ✅ Hàm setUser vừa set state, vừa lưu localStorage
  const setUser = (userData) => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
    setUserState(userData);
  };

  // ✅ Load user từ localStorage (nếu có)
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setUserState(JSON.parse(localUser));
    } else {
      // Optionally: gọi API kiểm tra token/session nếu dùng cookie
      axios.get("http://localhost:3000/auths/me", {
        withCredentials: true,
      }).then(res => {
        setUser(res.data.data);
      }).catch(() => {
        setUser(null);
      });
    }
  }, []);

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/auths/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
