import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav-inner">
      <Link to="/">🏠 Trang chủ</Link>
      <Link to="/cart">🛒 Giỏ hàng</Link>
      {user?.role === 'admin' && <Link to="/admin">🔧 Quản trị</Link>}
      {user ? (
        <>
          <span>👤 {user.name}</span>
          <button onClick={handleLogout}>Đăng xuất</button>
        </>
      ) : (
        <>
          <Link to="/login">Đăng nhập</Link>
          <Link to="/register">Đăng ký</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
