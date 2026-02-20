import { useState, useEffect } from 'react';
import api from '../services/api';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '', oab: '' });
  const [loading, setLoading] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  
  const [nivelSenha, setNivelSenha] = useState({ label: '', cor: '', largura: '0%', status: '' });
  const [requisitos, setRequisitos] = useState({
    tamanho: false,
    maiuscula: false,
    numero: false,
    especial: false
  });

  useEffect(() => {
    const senha = formData.senha;
    if (!senha) {
      setNivelSenha({ label: '', cor: '', largura: '0%', status: '' });
      setRequisitos({ tamanho: false, maiuscula: false, numero: false, especial: false });
      return;
    }

    const checagem = {
      tamanho: senha.length >= 8,
      maiuscula: /[A-Z]/.test(senha),
      numero: /[0-9]/.test(senha),
      especial: /[!@#$%^&*(),.?":{}|<>]/.test(senha)
    };
    
    setRequisitos(checagem);

    if (checagem.tamanho && checagem.maiuscula && checagem.numero && checagem.especial) {
      setNivelSenha({ label: 'Senha Forte', cor: '#10b981', largura: '100%', status: 'forte' });
    } else if (senha.length >= 6 && (checagem.maiuscula || checagem.numero)) {
      setNivelSenha({ label: 'Quase lá...', cor: '#f59e0b', largura: '60%', status: 'media' });
    } else {
      setNivelSenha({ label: 'Senha Fraca', cor: '#ef4444', largura: '30%', status: 'fraca' });
    }
  }, [formData.senha]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    
    if (nivelSenha.status !== 'forte') {
      setMsgErro('A senha não cumpre todos os requisitos de segurança.');
      return;
    }

    setLoading(true);
    setMsgErro('');

    try {
      await api.post('/advogado', formData);
      alert('Conta criada com sucesso!');
      window.location.href = '/login';
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setMsgErro('Este e-mail já está cadastrado.');
      } else {
        setMsgErro('Erro na conexão com o servidor.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Law<span>Sys</span></h2>
          <p>Crie sua conta profissional</p>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="input-group">
            <input type="text" placeholder="Nome Completo" onChange={e => setFormData({...formData, nome: e.target.value})} required />
          </div>
          
          <div className="input-group">
            <input 
              type="email" 
              placeholder="E-mail Profissional" 
              className={msgErro.includes('e-mail') ? 'input-error' : ''}
              onChange={e => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>

          <div className="input-group">
            <input type="text" placeholder="Número da OAB (Opcional)" onChange={e => setFormData({...formData, oab: e.target.value})} />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Senha" 
              onChange={e => setFormData({...formData, senha: e.target.value})} 
              required 
            />
            
            {formData.senha && (
              <div className="password-meter-container">
                <div className="password-meter-bar">
                  <div className="password-meter-fill" style={{ width: nivelSenha.largura, backgroundColor: nivelSenha.cor }}></div>
                </div>
                <span className="password-label" style={{ color: nivelSenha.cor }}>{nivelSenha.label}</span>
                
                <ul className="password-requirements">
                  <li className={requisitos.tamanho ? 'met' : ''}>{requisitos.tamanho ? '●' : '○'} 8+ caracteres</li>
                  <li className={requisitos.maiuscula ? 'met' : ''}>{requisitos.maiuscula ? '●' : '○'} Letra Maiúscula</li>
                  <li className={requisitos.numero ? 'met' : ''}>{requisitos.numero ? '●' : '○'} Um Número</li>
                  <li className={requisitos.especial ? 'met' : ''}>{requisitos.especial ? '●' : '○'} Símbolo (@#$)</li>
                </ul>
              </div>
            )}
          </div>

          {msgErro && <span className="error-message">{msgErro}</span>}

          <button type="submit" className="btn-submit" disabled={loading || (formData.senha.length > 0 && nivelSenha.status !== 'forte')}>
            {loading ? 'Processando...' : 'Finalizar Cadastro'}
          </button>
        </form>
      </div>
    </div>
  );
}