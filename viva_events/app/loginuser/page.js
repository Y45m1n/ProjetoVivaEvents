'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginUsuarioPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    // Envia a solicitação de login para a API
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Manipula a resposta da API
    if (response.ok) {
      const { token } = await response.json();
      // Armazena o token no localStorage
      localStorage.setItem('token', token);
      // Redireciona para a página principal ou para a página de eventos
      router.push('/');
    } else {
      // Define uma mensagem de erro se as credenciais forem inválidas
      setError('Credenciais inválidas');
    }
  };

  return (
    <div>
      <h1>Login de Usuário</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
      <button onClick={handleLogin}>Entrar</button>
      <p>
        Não tem uma conta? <a href="/registeruser">Registrar Usuário</a>
      </p>
    </div>
  );
}
