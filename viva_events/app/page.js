// app/page.js
'use client'; // Adicione esta linha no início do arquivo

import Header from '../app/header';
import styles from './page.module.css';
import EventCard from '../app/EventCard';
import { useEffect, useState } from 'react';

export default function Home() {
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
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1>Eventos</h1>
        <div className={styles.eventContainer}>
          {eventos.map((evento) => (
            <EventCard key={evento._id} evento={evento} />
          ))}
        </div>
        <a href="/logincola" className={styles.button}>Login colaborador</a>
      </main>
    </div>
  );
}
