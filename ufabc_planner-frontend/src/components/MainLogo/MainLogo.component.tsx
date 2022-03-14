import { FiCoffee } from 'react-icons/fi';
import styles from './MainLogo.module.scss';

const MainLogo = () => {
  return (
    <div className={styles.logo}>
      <FiCoffee size={40}/>

      <div className={styles.logo_text}>
        <p>UFABC</p>
        <p style={{ fontSize: '16px', fontWeight: 'light' }}>planner</p>
      </div>
    </div>
  );
}

export default MainLogo;
