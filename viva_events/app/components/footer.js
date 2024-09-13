import styles from './header.module.css';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
              <p>Email: exemplo@dominio.com</p>
              <p>Telefone: (11) 1234-5678</p>
            </div>
            <div className={styles.footerRight}>
              <Image
                src="/img/logo2.png"
                alt="Logo"
                width={100} // Ajuste o tamanho conforme necessário
                height={20} // Ajuste o tamanho conforme necessário
              />
            </div>
          </footer>
    );
}