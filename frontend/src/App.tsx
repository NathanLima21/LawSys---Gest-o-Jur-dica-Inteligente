import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Processos from './pages/Processos';
import Clientes from './pages/Clientes';
import Financeiro from './pages/Financeiro';
import Prazos from './pages/Prazos';
import Documentos from './pages/Documentos';
import Sidebar from './pages/Sidebar';
import Navbar from './pages/Navbar';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('@LawSys:token');
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const LayoutPrincipal = () => (
  <div
    className="system-main-layout"
    style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f8fafc'
    }}
  >
    <Sidebar />
    <main
      style={{
        flex: 1,
        marginLeft: '260px',
        padding: '20px'
      }}
    >
      <Outlet />
    </main>
  </div>
);

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const isHome = location.pathname === '/';

    if (isHome) {
      document.body.style.backgroundColor = '#0f172a';
      document.body.className = 'home-active';
    } else {
      document.body.style.backgroundColor = '#f8fafc';
      document.body.className = 'system-active';
    }

    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-main-wrapper">
      <Routes location={location}>
        {/* HOME */}
        <Route
          path="/"
          element={
            <div
              id="home-exclusive-page"
              style={{
                background: '#0f172a',
                minHeight: '100vh'
              }}
            >
              <Navbar />
              <Home />
            </div>
          }
        />

        {/* LOGIN / REGISTER */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* SISTEMA PRIVADO */}
        <Route
          element={
            <PrivateRoute>
              <LayoutPrincipal />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/processos" element={<Processos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/prazos" element={<Prazos />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/financeiro" element={<Financeiro />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}