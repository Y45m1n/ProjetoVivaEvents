'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '@/app/logincola/page.module.css'; // Ajuste conforme necessário

export default function EditarEventoPage() {
  const searchParams = useSearchParams();
  const protocolo = searchParams.get('protocolo');
  const [nome, setNome] = useState('');
  const [datafim, setDatafim] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('show');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!protocolo) {
      setError('Protocolo não fornecido.');
      return;
    }

    const fetchEvento = async () => {
      try {
        const response = await fetch(`/api/eventos/${protocolo}`);
        if (!response.ok) {
          throw new Error('Falha na resposta da API.');
        }
        const result = await response.json();
        if (result.success) {
          const { nome, datafim, localizacao, descricao, categoria } = result.data;
          setNome(nome);
          setDatafim(datafim);
          setLocalizacao(localizacao);
          setDescricao(descricao);
          setCategoria(categoria);
        } else {
          setError('Erro ao carregar os dados do evento.');
        }
      } catch (err) {
        setError(`Erro ao carregar os dados do evento: ${err.message}`);
      }
    };

    fetchEvento();
  }, [protocolo]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const evento = { nome, datafim, localizacao, descricao, categoria };

    try {
      const response = await fetch(`/api/eventos/${protocolo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evento),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta da API.');
      }

      const result = await response.json();

      if (result.success) {
        setSuccess('Evento atualizado com sucesso!');
        setError(null);
        setTimeout(() => router.push('/eventos'), 2000); // Redireciona após 2 segundos
      } else {
        setSuccess(null);
        setError('Erro ao atualizar o evento. Tente novamente.');
      }
    } catch (err) {
      setSuccess(null);
      setError(`Erro ao atualizar o evento: ${err.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Editar Evento</h1>
      {success && <p className={styles.success}>{success}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="protocolo">
          Protocolo:
          <input
            type="text"
            id="protocolo"
            value={protocolo || ''}
            readOnly
          />
        </label>
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
        <button type="submit" className={styles.button}>Atualizar Evento</button>
      </form>
    </div>
  );
}
