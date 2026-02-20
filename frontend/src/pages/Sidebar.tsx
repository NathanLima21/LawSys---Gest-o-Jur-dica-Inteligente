import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.getItem('@LawSys:token');
    localStorage.removeItem('@LawSys:token');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="logo">Law<span>Sys</span></div>
      <nav className="menu">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>📊 Dashboard</NavLink>
        <NavLink to="/processos" className={({ isActive }) => isActive ? 'active' : ''}>⚖️ Processos</NavLink>
        <NavLink to="/clientes" className={({ isActive }) => isActive ? 'active' : ''}>👤 Clientes</NavLink>
        <NavLink to="/prazos" className={({ isActive }) => isActive ? 'active' : ''}>📅 Prazos</NavLink>
        <NavLink to="/documentos" className={({ isActive }) => isActive ? 'active' : ''}>📁 Documentos</NavLink>
        <NavLink to="/financeiro" className={({ isActive }) => isActive ? 'active' : ''}>💰 Financeiro</NavLink>
      </nav>
      <button className="btn-logout" onClick={handleLogout}>Sair</button>
    </aside>
  );
}