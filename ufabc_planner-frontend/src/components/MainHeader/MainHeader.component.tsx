import { FiLayers } from 'react-icons/fi';
import styles from './MainHeader.module.scss';

const MainHeader = () => {
  return (
    <div className={styles.main_header}>
      <h2><FiLayers />Matérias</h2>

      <>
        André Rossini Bacchi
        | configurações
      </>
    </div>
  );
};

export default MainHeader;
