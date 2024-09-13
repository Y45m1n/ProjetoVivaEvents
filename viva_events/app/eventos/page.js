'use client';

import { useEffect, useState } from 'react';

export default function EventosPage() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('/api/eventos/get');
        const data = await response.json();
        setEventos(data.data);
      } catch (err) {
        console.error('Erro ao buscar eventos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Eventos</h1>
      <a href="/criarevento">Criar Novo Evento</a>
      <ul>
        {eventos.map((evento) => (
          <li key={evento._id}>
            <h2>{evento.nome}</h2>
            <p>Data de Fim: {new Date(evento.datafim).toLocaleDateString()}</p>
            <p>Localização: {evento.localizacao}</p>
            <p>Categoria: {evento.categoria}</p>
            <p>Descrição: {evento.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
