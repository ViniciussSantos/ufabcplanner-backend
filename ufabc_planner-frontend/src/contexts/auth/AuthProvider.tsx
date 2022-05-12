import { useCallback, useEffect, useState } from 'react';

import { ICredentials } from '../../interfaces/credentials';

import api from '../../services/api';

import { AuthContext } from './context';

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const login = useCallback(async (data: ICredentials, reloadOnAuth?: boolean) => {
    setLoading(true);

    await api
      .post('/users/login', data)
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem('auth_token', data.token)

          if (reloadOnAuth) window.location.reload();
        } else {
          alert('A API foi incapaz de gerar seu token de autenticação')
        }
      })
      .catch(error => {
        error?.response?.data?.message
          ? alert(error?.response?.data?.message)
          : alert('Houve um erro ao tentar fazer o login...');
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem('auth_token');

    window.location.reload();
  };

  useEffect(() => {
    setAuthenticated(!!localStorage.getItem('auth_token'));
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
