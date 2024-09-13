import styles from '../components/header.module.css'; 

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img
           src="/img/logo2.png" 
          alt="Logo"
          width={180} 
          height={38} 
        />
      </div>
    </header>
  );
}
