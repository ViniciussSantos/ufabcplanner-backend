import './styles/global.scss';
import styles from './App.module.scss';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <div className={styles.app_container}>
      <Sidebar />

      <div className={styles.main}>
        <div className={styles.content}>
          Conteúdo, provavelmente o Router vai vir aqui
        </div>

        <div className={styles.footer}>
          Footer legalzinho pro UFABCplanner | 2022
        </div>
      </div>
    </div>
  );
}

export default App;
