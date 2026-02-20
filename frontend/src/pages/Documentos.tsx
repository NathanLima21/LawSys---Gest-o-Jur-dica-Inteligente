import { useState, useEffect } from 'react';
import api from '../services/api';
import './Documentos.css';

interface Processo {
  id: string;
  numero: string;
}

interface Documento {
  id: string;
  nome: string;
  url: string;
  createdAt: string;
  processo?: { numero: string };
}

export default function Documentos() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Estados do formulário
  const [nomeArquivo, setNomeArquivo] = useState('');
  const [processoId, setProcessoId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function carregarDados() {
    try {
      // Carrega os documentos e os processos para o select
      const [resDocs, resProc] = await Promise.all([
        api.get('/documento'), // Certifique-se de ter essa rota Get no backend
        api.get('/processo')
      ]);
      setDocumentos(resDocs.data);
      setProcessos(resProc.data);
    } catch (err) {
      console.error("Erro ao carregar documentos.");
    }
  }

  useEffect(() => { carregarDados(); }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !processoId) return alert("Selecione o arquivo e o processo!");

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile); // Deve ser 'file' para bater com @UploadedFile()
    formData.append('nome', nomeArquivo);
    formData.append('processoId', processoId);

    try {
      await api.post('/documento/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setShowModal(false);
      setNomeArquivo('');
      setProcessoId('');
      setSelectedFile(null);
      carregarDados();
      alert("Upload realizado com sucesso!");
    } catch (err) {
      alert("Erro ao fazer upload.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletar = async (id: string) => {
    if (!confirm("Deseja excluir permanentemente este documento?")) return;
    try {
      await api.delete(`/documento/${id}`); // Implemente o delete no backend
      carregarDados();
    } catch (err) {
      alert("Erro ao excluir documento.");
    }
  };

  return (
    <div className="page-fade-in">
      <header className="content-header">
        <div>
          <h1>Gestão de Documentos</h1>
          <p>Armazene e organize os arquivos do escritório.</p>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>+ Upload de Arquivo</button>
      </header>

      <section className="table-container premium-glass">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Nome do Arquivo</th>
              <th>Processo</th>
              <th>Data</th>
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {documentos.map(doc => (
              <tr key={doc.id}>
                <td>{doc.nome}</td>
                <td>{doc.processo?.numero || 'N/A'}</td>
                <td>{new Date(doc.createdAt).toLocaleDateString('pt-BR')}</td>
                <td>
                  <div className="table-actions" style={{ justifyContent: 'center' }}>
                    <a href={doc.url} target="_blank" rel="noreferrer" className="btn-action" title="Baixar">
                      📥
                    </a>
                    <button onClick={() => handleDeletar(doc.id)} className="btn-action" title="Excluir">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content premium-glass">
            <h2>Novo Documento</h2>
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label>Nome Exibição (Ex: RG do Cliente)</label>
                <input 
                  type="text" 
                  value={nomeArquivo} 
                  onChange={e => setNomeArquivo(e.target.value)} 
                  required 
                />
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
                <label>Arquivo</label>
                <input 
                  type="file" 
                  onChange={e => setSelectedFile(e.target.files?.[0] || null)} 
                  required 
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">Cancelar</button>
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? 'Enviando...' : 'Fazer Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}