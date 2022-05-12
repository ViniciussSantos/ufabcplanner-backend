import { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InitialPageLayout } from '../../components/InitialPageLayout';

import { useAuth } from '../../contexts/auth';
import { ICredentials } from '../../interfaces/credentials';

const LoginPage = () => {
  const formRef = useRef(null);

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: ICredentials) => {
    setLoading(true);

    await login(data, true).then(() => setLoading(false));
  }, [login]);

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
