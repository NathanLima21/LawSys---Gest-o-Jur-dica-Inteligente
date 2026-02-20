import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { access_token } = response.data;

      localStorage.setItem('@LawSys:token', access_token);

      navigate('/dashboard'); 
    } catch (error) {
      alert('E-mail ou senha incorretos.');
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Law<span>Sys</span></h2>
          <p>Bem-vindo de volta, doutor.</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="E-mail" 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Senha" 
              onChange={e => setSenha(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn-submit">
            Acessar Painel
          </button>
        </form>

        <div className="auth-footer">
          Não tem uma conta? <Link to="/register">Criar conta grátis</Link>
        </div>
      </div>
    </div>
  );
}