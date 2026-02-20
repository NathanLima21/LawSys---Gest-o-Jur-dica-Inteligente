import { useState, useEffect } from 'react';
import api from '../services/api';
import './Financeiro.css';

interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'ENTRADA' | 'SAIDA';
  status: 'PAGO' | 'PENDENTE';
  data: string;
  processo?: { numero: string };
}

export default function Financeiro() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [processos, setProcessos] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Estados do formulário
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('ENTRADA');
  const [status, setStatus] = useState('PENDENTE');
  const [processoId, setProcessoId] = useState('');

  async function carregarDados() {
    try {
      const [resFin, resProc] = await Promise.all([
        api.get('/financeiro'),
        api.get('/processo')
      ]);
      setTransacoes(resFin.data);
      setProcessos(resProc.data);
    } catch (err) {
      console.error("Erro ao carregar dados financeiros.");
    }
  }

  useEffect(() => { carregarDados(); }, []);

  // Cálculos dos Cards
  const receitas = transacoes.filter(t => t.tipo === 'ENTRADA').reduce((acc, t) => acc + Number(t.valor), 0);
  const despesas = transacoes.filter(t => t.tipo === 'SAIDA').reduce((acc, t) => acc + Number(t.valor), 0);
  const saldo = receitas - despesas;

  const handleAddTransacao = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/financeiro', {
        descricao,
        valor: parseFloat(valor),
        tipo,
        status,
        processoId
      });
      setShowModal(false);
      setDescricao(''); setValor(''); setProcessoId('');
      carregarDados();
    } catch (err) {
      alert("Erro ao salvar transação.");
    }
  };

  const handleDeletar = async (id: string) => {
    if (!confirm("Excluir esta transação?")) return;
    try {
      await api.delete(`/financeiro/${id}`);
      carregarDados();
    } catch (err) {
      alert("Erro ao excluir.");
    }
  };

  return (
    <div className="financeiro-container page-fade-in">
      <header className="content-header">
        <div>
          <h1>Financeiro</h1>
          <p>Controle de entradas e saídas do escritório.</p>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>+ Nova Transação</button>
      </header>

      <section className="stats-grid">
        <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
          <span className="stat-label">Receitas</span>
          <span className="stat-value" style={{ color: '#10b981' }}>
            {receitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #ef4444' }}>
          <span className="stat-label">Despesas</span>
          <span className="stat-value" style={{ color: '#ef4444' }}>
            {despesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #3b82f6' }}>
          <span className="stat-label">Saldo Líquido</span>
          <span className="stat-value">
            {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </section>

      <section className="table-container premium-glass">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Processo</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map(t => (
              <tr key={t.id}>
                <td>{t.descricao}</td>
                <td>{t.processo?.numero || 'N/A'}</td>
                <td style={{ color: t.tipo === 'ENTRADA' ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                  {t.tipo === 'ENTRADA' ? '+' : '-'} {Number(t.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td>{new Date(t.data).toLocaleDateString('pt-BR')}</td>
                <td>
                  <span className={`status-badge ${t.status === 'PAGO' ? 'concluido' : 'urgente'}`}>
                    {t.status}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => handleDeletar(t.id)} className="btn-delete" title="Excluir">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content premium-glass">
            <h2>Nova Transação</h2>
            <form onSubmit={handleAddTransacao}>
              <div className="form-group">
                <label>Descrição</label>
                <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} required />
              </div>
              <div className="form-group-row" style={{ display: 'flex', gap: '10px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Valor (R$)</label>
                  <input type="number" step="0.01" value={valor} onChange={e => setValor(e.target.value)} required />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Tipo</label>
                  <select value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="ENTRADA">Entrada (+)</option>
                    <option value="SAIDA">Saída (-)</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Vincular Processo</label>
                <select value={processoId} onChange={e => setProcessoId(e.target.value)} required>
                  <option value="">Selecione...</option>
                  {processos.map(p => <option key={p.id} value={p.id}>{p.numero}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="PENDENTE">Pendente</option>
                  <option value="PAGO">Pago/Recebido</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn-save">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}