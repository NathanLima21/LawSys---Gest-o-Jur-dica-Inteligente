import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo">
          LAWSYS<span style={{ color: '#bae6fd' }}>.</span>
        </Link>

        <div className="nav-right">
          <Link to="/login" className="login-btn">Entrar</Link>
          <Link to="/register" className="register-nav-btn">Criar Conta</Link>
        </div>
      </div>
    </nav>
  );
}