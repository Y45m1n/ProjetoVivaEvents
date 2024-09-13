import styles from './header.module.css';
import Image from 'next/image';

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image
            src="/img/logo2.png"
            alt="Logo"
            width={180}
            height={38}
          />
        </div>
        <div className={styles.buttons}>
          <a href="/loginuser" className={styles.button}>Login Visitante</a>
          <a href="/registeruser" className={styles.button}>Cadastro Visitante</a>
        </div>
      </header>
    </>
  );
}
