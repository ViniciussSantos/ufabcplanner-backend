import { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InitialPageLayout } from '../../components/InitialPageLayout';
import { IUser } from '../../interfaces/user';

interface FormData extends IUser {
  passwordConfirmation: string;
}

const SigninPage = () => {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: FormData) => {
    setLoading(true);

    setTimeout(() => { setLoading(false); alert(`mandando para a api: ${JSON.stringify(data)}`)}, 2000);

    // await api
    //   .post('/signin', userData)
    //   .then(() => alert('Usuário criado com sucesso!'))
    //   .catch(error => alert(error))
    //   .finally(() => setLoading(false))
  }, []);

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
