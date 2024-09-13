// app/colaborador/login.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '/projetos4termo/ProjetosNodeReact/ProjetoVivaEvents/viva_events/app/page.module.css'; 

export default function LoginColaboradorPage() {
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/colaboradores/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        router.push('/eventos');
      } else {
        const { error } = await response.json();
        setError(error || 'Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao realizar login. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login de Colaborador</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleLogin} className={styles.form}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={styles.button}>Entrar</button>
        <p>
          Não tem uma conta? <a href="/registercola">Registrar Colaborador</a>
        </p>
      </form>
    </div>
  );
}
