import { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InitialPageLayout } from '../../components/InitialPageLayout';

import api from '../../services/api';

const LoginPage = () => {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback((authToken: string) => {
    localStorage.setItem('auth_token', authToken)

    window.location.reload();
  }, []);

  const handleSubmit = useCallback(async (data: any) => {
    setLoading(true);

    await api
      .post('/users/login', data)
      .then(({ data }) => data.token ? handleLogin(data.token) : alert('A API foi incapaz de gerar seu token de autenticação'))
      .catch(error => {
        error?.response?.data?.message
          ? alert(error?.response?.data?.message)
          : alert('Houve um erro ao tentar cadastrar o usuário...');

        setLoading(false);
      });
  }, [handleLogin]);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <InitialPageLayout
        title="Bem-vindo"
        subtitle="Esse é o MVP do UFABCplanner, aproveite!"
        subtext={{ question: 'Não tem conta?', linkLabel: 'Faça o cadastro', linkTo: '/signin' }}
      >
        <Input name="email" label="E-mail*" placeholder="Digite seu e-mail" />

        <Input name="password" label="Senha*" type="password" placeholder="Digite sua senha" />

        <Button type="submit" loading={loading}>Entrar</Button>
      </InitialPageLayout>
    </Form>
  );
}

export default LoginPage;
