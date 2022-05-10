import { createContext } from 'react';

import { ICredentials } from '../../interfaces/credentials';

export interface AuthContextData {
  authenticated: boolean
  loading: boolean
  login: (credentials: ICredentials, reloadOnAuth?: boolean) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export { AuthContext };
