// components/Header.js

import styles from './header.module.css'; // Certifique-se de que o nome do arquivo esteja correto

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img
          src="/img/logo2.png" // Caminho relativo à pasta 'public'
          alt="Logo"
          width={180} // Ajuste conforme necessário
          height={38} // Ajuste conforme necessário
        />
      </div>
      <div className={styles.buttons}>
        <a href="/loginuser" className={styles.button}>Login Visitante</a>
        <a href="/registeruser" className={styles.button}>Cadastro Visitante</a>
      </div>
    </header>
  );
}
