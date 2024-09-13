// app/eventos/criareventos.js
'use client';

import { useState } from 'react';
import styles from '/projetos4termo/ProjetosNodeReact/ProjetoVivaEvents/viva_events/app/page.module.css'; // Certifique-se de que este arquivo CSS está no mesmo diretório

export default function CriarEventoPage() {
  const [nome, setNome] = useState('');
  const [datafim, setDatafim] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('show');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const evento = { nome, datafim, localizacao, descricao, categoria };

    try {
      const response = await fetch('/api/eventos/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evento),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Evento criado com sucesso!');
        setError(null);
        // Limpar os campos após o sucesso, se desejar
        setNome('');
        setDatafim('');
        setLocalizacao('');
        setDescricao('');
        setCategoria('show');
      } else {
        setSuccess(null);
        setError('Erro ao criar o evento. Tente novamente.');
      }
    } catch (err) {
      setSuccess(null);
      setError('Erro ao criar o evento. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Criar Novo Evento</h1>
      {success && <p className={styles.success}>{success}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <label htmlFor="datafim">
          Data de Fim:
          <input
            type="date"
            id="datafim"
            value={datafim}
            onChange={(e) => setDatafim(e.target.value)}
          />
        </label>
        <label htmlFor="localizacao">
          Localização:
          <input
            type="text"
            id="localizacao"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            required
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>
        <label htmlFor="categoria">
          Categoria:
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="show">Show</option>
            <option value="palestra">Palestra</option>
            <option value="workshop">Workshop</option>
            <option value="tarde de autógrafos">Tarde de Autógrafos</option>
          </select>
        </label>
        <button type="submit" className={styles.button}>Criar Evento</button>
      </form>
    </div>
  );
}
