'use client'; 

import Header from '../app/components/header';
import styles from './page.module.css';
import EventCard from '../app/components/EventCard';
import { useEffect, useState } from 'react';
import Footer from './components/footer';

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
    <>
      <Header />
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Eventos</h1>
          <div className={styles.eventContainer}>
            {eventos.map((evento) => (
              <EventCard key={evento._id} evento={evento} />
            ))}
          </div>
          <div className={styles.loginCard}>
            <a href="/logincola" className={styles.button}>Login colaborador</a>
          </div>
        </main>
      </div>
      <Footer /></>
  );
}