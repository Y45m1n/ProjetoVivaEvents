'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterColaboradorPage() {
  const [nome, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async () => {
    const response = await fetch('/api/colaboradores/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (response.ok) {
      router.push('/logincola');
    } else {
      setError('Erro ao registrar colaborador');
    }
  };

  return (
    <div>
      <h1>Registrar Colaborador</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={senha}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar Colaborador</button>
      <p>
        Já tem uma conta? <a href="/logincola">Faça login</a>
      </p>
    </div>
  );
}
