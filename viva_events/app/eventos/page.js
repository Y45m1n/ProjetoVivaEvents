'use client';

import { useEffect, useState } from 'react';
import styles from '../components/EventCard.module.css'; // Certifique-se de que este caminho esteja correto
import Header from '../components/header'; // Ajuste o caminho se necessário

export default function EventosPage() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('/api/eventos/get');
        const data = await response.json();
        if (data.success) {
          setEventos(data.data);
        } else {
          console.error('Erro ao buscar eventos:', data.error);
        }
      } catch (err) {
        console.error('Erro ao buscar eventos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  if (loading) return <p>Carregando...</p>;

  const handleDelete = async (protocolo) => {
    if (confirm('Você tem certeza que deseja apagar este evento?')) {
      try {
        const response = await fetch(`/api/eventos/${protocolo}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setEventos(eventos.filter(evento => evento.protocolo !== protocolo));
        } else {
          alert('Erro ao apagar o evento.');
        }
      } catch (err) {
        console.error('Erro ao apagar o evento:', err);
      }
    }
  };

  return (
    <div>
      <Header />
      <h1>Eventos</h1>
      <a href="/eventos/registerEvento" className={styles.button}>Criar Novo Evento</a>
      <ul className={styles.eventList}>
        {eventos.map((evento) => (
          <li key={evento.protocolo} className={styles.card}>
            <h2 className={styles.title}>{evento.nome}</h2>
            <p><strong>Data de Fim:</strong> {new Date(evento.datafim).toLocaleDateString()}</p>
            <p><strong>Localização:</strong> {evento.localizacao}</p>
            <p><strong>Categoria:</strong> {evento.categoria}</p>
            <p><strong>Descrição:</strong> {evento.descricao}</p>
            <div className={styles.buttonContainer}>
              <a href={`/eventos/editarEvento?protocolo=${evento.protocolo}`} className={styles.button}>Editar</a>
              <button 
                onClick={() => handleDelete(evento.protocolo)} 
                className={styles.button}
              >
                Apagar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
