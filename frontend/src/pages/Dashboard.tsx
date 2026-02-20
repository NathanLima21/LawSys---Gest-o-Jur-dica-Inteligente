import { useEffect, useState } from 'react';
import api from '../services/api';
import './Dashboard.css';

// Interface para tipar os dados que vêm do banco
interface Processo {
  id: string;
  numero: string;
  cliente?: { nome: string };
  tipo: string;
  status: string;
}

export default function Dashboard() {
  const [userName, setUserName] = useState('Doutor');
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [stats, setStats] = useState([
    { label: 'Processos Ativos', value: '0', icon: '⚖️' },
    { label: 'Prazos (Hoje)', value: '0', icon: '📅' },
    { label: 'Clientes', value: '0', icon: '👤' },
    { label: 'Financeiro', value: 'R$ 0', icon: '💰' },
  ]);

  async function carregarDashboard() {
    try {
      console.log("Iniciando carregamento do Dashboard...");

      const [resProc, resCli, resPrazos, resFin] = await Promise.all([
        api.get('/processo'),
        api.get('/cliente'),
        api.get('/prazo'),
        api.get('/financeiro')
      ]);

      // 🔎 Caso a API retorne { data: [...] }
      const processosData = resProc.data.data || resProc.data;
      const clientesData = resCli.data.data || resCli.data;
      const prazosData = resPrazos.data.data || resPrazos.data;
      const financeiroData = resFin.data.data || resFin.data;

      console.log("Processos:", processosData);
      console.log("Clientes:", clientesData);
      console.log("Prazos:", prazosData);
      console.log("Financeiro:", financeiroData);

      // 📅 Prazos de Hoje
      const hoje = new Date().toLocaleDateString('pt-BR');
      const prazosHoje = prazosData.filter((p: any) => {
        const dataPrazo = new Date(p.dataLimite).toLocaleDateString('pt-BR');
        return dataPrazo === hoje && !p.finalizado;
      }).length;

      // 💰 Financeiro
      const totalFinanceiro = financeiroData.reduce((acc: number, t: any) => {
        const valor = parseFloat(t.valor?.toString() || "0");
        return t.tipo === 'ENTRADA' ? acc + valor : acc - valor;
      }, 0);

      // ⚖️ Processos Ativos
      const ativos = processosData.filter((p: any) => p.status !== 'Finalizado').length;

      // 📋 Atualiza tabela (5 mais recentes)
      setProcessos(processosData.slice(0, 5));

      // 📊 Atualiza cards
      setStats([
        { 
          label: 'Processos Ativos', 
          value: ativos.toString(), 
          icon: '⚖️' 
        },
        { 
          label: 'Prazos (Hoje)', 
          value: prazosHoje.toString(), 
          icon: '📅' 
        },
        { 
          label: 'Clientes', 
          value: clientesData.length.toString(), 
          icon: '👤' 
        },
        { 
          label: 'Financeiro', 
          value: totalFinanceiro.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }), 
          icon: '💰' 
        },
      ]);

      console.log("Dashboard atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
    }
  }

  // 🔥 Hook principal
  useEffect(() => {
    carregarDashboard();

    const savedUser = localStorage.getItem('user_name');
    if (savedUser) setUserName(savedUser);
  }, []);

  // 🗑️ Deletar processo
  const handleDeletar = async (id: string) => {
    if (!confirm("Deseja remover este processo? Todos os dados vinculados serão excluídos.")) return;
    try {
      await api.delete(`/processo/${id}`);
      await carregarDashboard();
    } catch (err) {
      alert("Erro ao remover processo. Verifique as dependências.");
    }
  };

  // ✅ Finalizar processo
  const handleConcluir = async (id: string) => {
    try {
      await api.patch(`/processo/${id}`, { status: 'Finalizado' });
      await carregarDashboard();
    } catch (err) {
      alert("Erro ao atualizar status.");
    }
  };

  return (
    <div className="dashboard-content page-fade-in">
      <header className="dash-header">
        <h1>Olá, {userName}</h1>
        <p>Veja o resumo do seu escritório hoje.</p>
      </header>

      <section className="stats-grid">
        {stats.map((item, index) => (
          <div key={index} className="stat-card">
            <span className="stat-icon">{item.icon}</span>
            <div className="stat-info">
              <span className="stat-label">{item.label}</span>
              <span className="stat-value">{item.value}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="recent-section">
        <div className="section-header">
          <h3>Processos Recentes:</h3>
        </div>
        
        <div className="table-container premium-glass">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nº do Processo</th>
                <th>Cliente</th>
                <th>Ação</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {processos.length > 0 ? (
                processos.map((p) => (
                  <tr key={p.id}>
                    <td><strong>{p.numero}</strong></td>
                    <td>{p.cliente?.nome || 'Não informado'}</td>
                    <td>{p.tipo || 'Geral'}</td>
                    <td>
                      <span className={`status-badge ${p.status === 'Finalizado' ? 'success' : 'urgente'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions" style={{ justifyContent: 'center' }}>
                        <button onClick={() => handleConcluir(p.id)} className="btn-action" title="Finalizar">✅</button>
                        <button onClick={() => handleDeletar(p.id)} className="btn-action" title="Excluir">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>
                    Nenhum processo recente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}