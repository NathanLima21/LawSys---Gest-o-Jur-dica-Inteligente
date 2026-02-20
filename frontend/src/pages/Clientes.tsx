import { useState, useEffect } from 'react';
import api from '../services/api';
import './Clientes.css';

interface Cliente {
  id: string;
  nome: string;
  cpf_cnpj: string;
  email?: string;
  telefone?: string;
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [showModal, setShowModal] = useState(false);
  
  // Estados para o formulário de cadastro
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  // Busca inicial de dados
  async function fetchClientes() {
    try {
      const response = await api.get('/cliente'); 
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao carregar lista de clientes.");
    }
  }

  useEffect(() => { 
    fetchClientes(); 
  }, []);

  // Lógica de busca: Filtra a lista original em tempo real
  const clientesFiltrados = clientes.filter(cli => 
    cli.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cli.cpf_cnpj.includes(searchTerm)
  );

  // Função para deletar cliente
  const handleDelete = async (id: string) => {
    if (!id) return;
    if (window.confirm("Atenção: Deseja apagar este cliente permanentemente?")) {
      try {
        await api.delete(`/cliente/${id}`); 
        alert("Cliente removido com sucesso!");
        fetchClientes();
      } catch (error: any) {
        alert(`Erro ao excluir cliente.`);
      }
    }
  };

  // Função para cadastrar novo cliente
  const handleAddCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const novoCliente = { 
        nome, 
        cpf_cnpj: documento, 
        email, 
        telefone 
      };
      
      await api.post('/cliente', novoCliente);
      setShowModal(false);
      
      // Limpa os campos
      setNome(''); setDocumento(''); setEmail(''); setTelefone('');
      
      fetchClientes();
      alert("Cliente cadastrado com sucesso!");
    } catch (_) {
      alert("Erro ao salvar. Verifique sua conexão ou login.");
    }
  };

  return (
    <div className="clientes-container">
      <header className="content-header">
        <div>
          <h1>Base de Clientes</h1>
          <p>Gerencie as informações dos seus assistidos.</p>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          + Novo Cliente
        </button>
      </header>

      {/* BARRA DE BUSCA COM LUPINHA */}
      <div className="search-container">
        <div className="search-wrapper">
          <input 
            type="text" 
            placeholder="Buscar por nome ou CPF..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" title="Buscar">
            🔍
          </button>
        </div>
      </div>

      <div className="table-container premium-glass">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map(cli => (
                <tr key={cli.id}>
                  <td><strong>{cli.nome}</strong></td>
                  <td>{cli.cpf_cnpj}</td>
                  <td>{cli.email || '-'}</td>
                  <td>{cli.telefone || '-'}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDelete(cli.id)}
                      title="Excluir do Banco"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  Nenhum cliente encontrado para "{searchTerm}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL DE CADASTRO */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content premium-glass">
            <h2>Cadastrar Cliente</h2>
            <form onSubmit={handleAddCliente}>
              <div className="form-group">
                <label>Nome Completo</label>
                <input value={nome} onChange={e => setNome(e.target.value)} required placeholder="Ex: João Silva" />
              </div>
              <div className="form-group">
                <label>CPF ou CNPJ</label>
                <input value={documento} onChange={e => setDocumento(e.target.value)} required placeholder="000.000.000-00" />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="cliente@email.com" />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(11) 99999-9999" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn-save">Salvar Cliente</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}