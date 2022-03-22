import './styles/global.scss';
import styles from './App.module.scss';
import { Sidebar } from './components/Sidebar';
import { MainHeader } from './components/MainHeader';
import Router from './routes/UFABCPlannerRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className={styles.app_container}>
      <BrowserRouter>
        <Sidebar />

        <div className={styles.main}>
          <MainHeader />

          <div className={styles.content}>
            <Router />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
