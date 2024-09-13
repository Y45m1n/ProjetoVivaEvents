// components/EventCard.js

import styles from './EventCard.module.css'; // Certifique-se de que o caminho esteja correto

export default function EventCard({ evento }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{evento.nome}</h2>
      <p><strong>Data de Fim:</strong> {new Date(evento.datafim).toLocaleDateString()}</p>
      <p><strong>Localização:</strong> {evento.localizacao}</p>
      <p><strong>Categoria:</strong> {evento.categoria}</p>
      <p><strong>Descrição:</strong> {evento.descricao}</p>
      <a href={`/inscrever/${evento._id}`} className={styles.button}>Inscrever no Evento</a>
    </div>
  );
}
