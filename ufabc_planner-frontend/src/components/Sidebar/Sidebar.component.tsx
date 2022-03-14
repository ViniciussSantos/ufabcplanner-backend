import { SidebarButton } from '../SidebarButton';
import styles from './Sidebar.module.scss';
import { FiBookOpen, FiCalendar, FiCoffee, FiFileText, FiLayers, FiSkipBack } from 'react-icons/fi'
import { MainLogo } from '../MainLogo';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <MainLogo />

      <div className={styles.btns_container}>
        <SidebarButton>
          <FiCalendar />

          Calendário
        </SidebarButton>

        <SidebarButton selected>
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
