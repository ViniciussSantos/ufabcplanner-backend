import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@unform/web'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InitialPageLayout } from '../../components/InitialPageLayout';

import { IUser } from '../../interfaces/user';

import api from '../../services/api';

interface FormData extends IUser {
  passwordConfirmation: string;
}

const SigninPage = () => {
  const formRef = useRef(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: FormData) => {
    setLoading(true);

    await api
      .post('/users', data)
      .then(() => { alert('Usuário criado com sucesso!'); navigate('/login') })
      .catch(error => error?.response?.data?.message ? alert(error?.response?.data?.message) : alert('Houve um erro ao tentar cadastrar o usuário...'))
      .finally(() => setLoading(false))
  }, [navigate]);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <InitialPageLayout
        title="Cadastre-se"
        subtitle="Você está fazendo o cadastro no UFABCplanner"
        subtext={{ question: 'Já tem conta?', linkLabel: 'Faça o login', linkTo: '/login' }}
      >
        <Input name="name" label="Nome*" placeholder="Digite seu nome completo" />

        <Input name="email" label="E-mail*" placeholder="Digite seu e-mail" />

        <div style={{ width: '100%', display: 'flex', gap: '32px' }}>
          <Input name="password" label="Senha*" placeholder="Crie uma senha" type="password" />

          <Input name="passwordConfirmation" label="Confirmar senha*" placeholder="Confirme sua senha" type="password" />
        </div>

        <Button type="submit" loading={loading}>Cadastrar</Button>
      </InitialPageLayout>
    </Form>
  );
}

export default SigninPage;
