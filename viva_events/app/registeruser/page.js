'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterUsuarioPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async () => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      router.push('/loginuser');
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Erro ao registrar usuário');
    }
  };

  return (
    <div>
      <h1>Registrar Usuário</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Nome"
        value={name}
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
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar Usuário</button>
      <p>
        Já tem uma conta? <a href="/loginuser">Faça login</a>
      </p>
    </div>
  );
}
