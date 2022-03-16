import './styles/global.scss';
import styles from './App.module.scss';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/dashboard';
import { MainHeader } from './components/MainHeader';

function App() {
  return (
    <div className={styles.app_container}>
      <Sidebar />

      <div className={styles.main}>
        <MainHeader />
        
        <div className={styles.content}>
          <DashboardPage />
        
          <div className={styles.footer}>
            Footer legalzinho pro UFABCplanner | 2022
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
