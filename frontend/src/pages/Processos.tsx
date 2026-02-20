import { useState, useEffect } from 'react';
import api from '../services/api';
import './Processos.css';

interface Cliente {
  id: string;
  nome: string;
}

interface Processo {
  id: string;
  numero: string;
  cliente?: { nome: string }; 
  tipo: string;
  status: string;
}

export default function Processos() {
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  const [numero, setNumero] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [tipo, setTipo] = useState('');

  async function carregarDados() {
    try {
      const [resProc, resCli] = await Promise.all([
        api.get('/processo'), 
        api.get('/cliente')  
      ]);
      setProcessos(resProc.data);
      setClientes(resCli.data);
    } catch (err: any) {
      console.error("Erro ao carregar dados:", err.response?.status);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const handleSalvarProcesso = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteId) return alert("Por favor, selecione um cliente!");

    try {
      const novoProcesso = {
        titulo: `Processo ${numero}`, 
        numero: numero,
        clienteId: clienteId, 
        tipo: tipo || "Cível", // Se estiver vazio, assume Cível
        status: 'Ativo'
      };
      
      await api.post('/processo', novoProcesso);
      
      setShowModal(false);
      setNumero('');
      setClienteId('');
      setTipo('');
      carregarDados();
      
      alert("Processo salvo com sucesso!");
    } catch (err: any) {
      console.error("Erro no POST:", err.response?.data);
      alert("Erro ao salvar. Verifique se o campo 'tipo' existe no seu banco.");
    }
  };

  const handleDeletar = async (id: string) => {
    if (!confirm("Deseja realmente excluir este processo?")) return;
    try {
      await api.delete(`/processo/${id}`);
      carregarDados();
    } catch (err) {
      alert("Erro ao deletar processo.");
    }
  };

  const handleConcluir = async (id: string) => {
    try {
      await api.patch(`/processo/${id}`, { status: 'Finalizado' });
      carregarDados();
    } catch (err) {
      alert("Erro ao atualizar status.");
    }
  };

  return (
    <div className="processos-container">
      <div className="app-background-glow"></div> 
      
      <header className="content-header">
        <div>
          <h1>⚖️ Gestão de Processos</h1>
          <p>Gerencie e vincule ações aos seus clientes.</p>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          + Registrar Processo
        </button>
      </header>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content premium-glass">
            <h2>Novo Registro</h2>
            <form onSubmit={handleSalvarProcesso}>
              <div className="form-group">
                <label>Número do Processo</label>
                <input 
                  type="text" 
                  value={numero} 
                  onChange={e => setNumero(e.target.value)} 
                  required 
                  placeholder="0000000-00.2026.8.26.0000"
                />
              </div>

              <div className="form-group">
                <label>Cliente (Vinculado)</label>
                <select value={clienteId} onChange={e => setClienteId(e.target.value)} required>
                  <option value="">Selecione um cliente...</option>
                  {clientes.map(cli => (
                    <option key={cli.id} value={cli.id}>{cli.nome}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Tipo de Ação</label>
                <input 
                  type="text" 
                  value={tipo} 
                  onChange={e => setTipo(e.target.value)} 
                  placeholder="Ex: Trabalhista, Civil..." 
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">Cancelar</button>
                <button type="submit" className="btn-save">Salvar Processo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="table-wrapper premium-glass">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Número</th>
              <th>Cliente Vinculado</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {processos.length > 0 ? (
              processos.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.numero}</strong></td>
                  <td>{p.cliente?.nome || 'Não vinculado'}</td> 
                  <td>{p.tipo || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${p.status === 'Finalizado' ? 'success' : ''}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button onClick={() => handleConcluir(p.id)} className="btn-action" title="Finalizar">✅</button>
                      <button onClick={() => handleDeletar(p.id)} className="btn-action" title="Excluir">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  Nenhum processo encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}