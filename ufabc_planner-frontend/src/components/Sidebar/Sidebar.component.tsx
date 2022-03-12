import { SidebarButton } from '../SidebarButton';
import styles from './Sidebar.module.scss';
import { FiBookOpen, FiCalendar, FiCoffee, FiFileText, FiLayers, FiSkipBack } from 'react-icons/fi'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <FiCoffee />

        <p style={{ fontWeight: 'bold' }}>UFABC</p>
        <p style={{ fontSize: '16px', fontWeight: 'light' }}>planner</p>
      </div>

      <div className={styles.btns_container}>
        <SidebarButton>
          <FiCalendar />

          Calendário
        </SidebarButton>

        <SidebarButton>
          <FiLayers />

          Matérias
        </SidebarButton>

        <SidebarButton>
          <FiSkipBack />

          Histórico
        </SidebarButton>

        <SidebarButton>
          <FiBookOpen />

          Diário
        </SidebarButton>

        <SidebarButton>
          <FiFileText />

          Avaliações
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
