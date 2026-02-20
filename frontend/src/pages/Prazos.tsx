import { useState, useEffect } from 'react';
import api from '../services/api';
import './Prazos.css';

interface Processo {
  id: string;
  numero: string;
}

interface Prazo {
  id: string;
  descricao: string;
  dataLimite: string;
  finalizado: boolean;
  processo?: { numero: string };
}

export default function Prazos() {
  const [prazos, setPrazos] = useState<Prazo[]>([]);
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  const [descricao, setDescricao] = useState('');
  const [dataLimite, setDataLimite] = useState('');
  const [processoId, setProcessoId] = useState('');

  async function carregarDados() {
    try {
      const [resPrazos, resProc] = await Promise.all([
        api.get('/prazo'),
        api.get('/processo')
      ]);
      setPrazos(resPrazos.data);
      setProcessos(resProc.data);
    } catch (err) {
      console.error("Erro ao carregar dados.");
    }
  }

  useEffect(() => { carregarDados(); }, []);

  const handleAgendar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!processoId) return alert("Selecione um processo!");

    try {
      await api.post('/prazo', {
        descricao,
        dataLimite,
        processoId,
        finalizado: false
      });
      
      setShowModal(false);
      setDescricao('');
      setDataLimite('');
      setProcessoId('');
      carregarDados();
    } catch (err) {
      alert("Erro ao agendar prazo.");
    }
  };

  // FUNÇÃO PARA FINALIZAR (IGUAL PROCESSOS)
  const handleFinalizar = async (id: string, statusAtual: boolean) => {
    try {
      await api.patch(`/prazo/${id}`, { finalizado: !statusAtual });
      carregarDados();
    } catch (err) {
      alert("Erro ao atualizar status.");
    }
  };

  // FUNÇÃO PARA EXCLUIR (IGUAL PROCESSOS)
  const handleDeletar = async (id: string) => {
    if (!confirm("Deseja remover este prazo permanentemente?")) return;
    try {
      await api.delete(`/prazo/${id}`);
      carregarDados();
    } catch (err) {
      alert("Erro ao excluir.");
    }
  };

  return (
    <div className="prazos-container">
      <header className="content-header">
        <div>
          <h1>Prazos e Diligências</h1>
          <p>Controle suas fatalidades e compromissos.</p>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          + Agendar Prazo
        </button>
      </header>

      <section className="table-container premium-glass">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Vencimento</th>
              <th>Descrição</th>
              <th>Processo</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {prazos.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.dataLimite).toLocaleDateString('pt-BR')}</td>
                <td>{item.descricao}</td>
                <td>{item.processo?.numero || 'N/A'}</td>
                <td>
                  <span className={`status-badge ${item.finalizado ? 'success' : 'urgente'}`}>
                    {item.finalizado ? 'Concluído' : 'Pendente'}
                  </span>
                </td>
                <td>
                  {/* BOTÕES IGUAIS AOS DE PROCESSOS */}
                  <div className="table-actions" style={{ justifyContent: 'center' }}>
                    <button 
                      onClick={() => handleFinalizar(item.id, item.finalizado)} 
                      className="btn-action" 
                      title={item.finalizado ? "Reabrir" : "Finalizar"}
                    >
                      ✅
                    </button>
                    <button 
                      onClick={() => handleDeletar(item.id)} 
                      className="btn-action" 
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* MODAL DE AGENDAMENTO */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content premium-glass">
            <h2>Novo Prazo</h2>
            <form onSubmit={handleAgendar}>
              <div className="form-group">
                <label>Descrição</label>
                <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Vincular ao Processo</label>
                <select value={processoId} onChange={e => setProcessoId(e.target.value)} required>
                  <option value="">Selecione o processo...</option>
                  {processos.map(p => (
                    <option key={p.id} value={p.id}>{p.numero}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Data Limite</label>
                <input type="date" value={dataLimite} onChange={e => setDataLimite(e.target.value)} required />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">Cancelar</button>
                <button type="submit" className="btn-save">Salvar Prazo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}