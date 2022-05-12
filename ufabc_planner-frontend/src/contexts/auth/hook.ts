import { useContext } from 'react';

import { AuthContext, AuthContextData } from './context';

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { useAuth };
