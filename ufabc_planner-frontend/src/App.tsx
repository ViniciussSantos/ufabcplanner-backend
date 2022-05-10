import { BrowserRouter } from 'react-router-dom';

import { Sidebar } from './components/Sidebar';
import { MainHeader } from './components/MainHeader';

import { AuthProvider, useAuth } from './contexts/auth';

import AuthenticatedRoutes from './routes/AuthenticatedRoutes';
import NotAuthenticatedRoutes from './routes/NotAuthenticatedRoutes';

import './styles/global.scss';
import styles from './App.module.scss';

function AppContent() {
  const { authenticated } = useAuth();

  if (!authenticated) return (
    <div className={styles.not_authenticated_container}>
      <BrowserRouter>
        <NotAuthenticatedRoutes />
      </BrowserRouter>
    </div>
  );

  return (
    <div className={styles.app_container}>
      <BrowserRouter>
        <Sidebar />

        <div className={styles.main}>
          <MainHeader />

          <div className={styles.content}>
            <AuthenticatedRoutes />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
