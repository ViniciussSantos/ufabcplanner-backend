import { SidebarButton } from '../SidebarButton';
import styles from './Sidebar.module.scss';
import { FiBookOpen, FiCalendar, FiFileText, FiLayers, FiSkipBack } from 'react-icons/fi'
import { MainLogo } from '../MainLogo';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <MainLogo />

      <div className={styles.btns_container}>
        <SidebarButton linkTo="/dashboard" selected>
          <FiLayers />

          Dashboard
        </SidebarButton>

        <SidebarButton linkTo="/calendar">
          <FiCalendar />

          Calendário
        </SidebarButton>

        <SidebarButton linkTo="/tasks">
          <FiSkipBack />

          Tarefas
        </SidebarButton>

        <SidebarButton linkTo="/exams">
          <FiBookOpen />

          Provas
        </SidebarButton>

        <SidebarButton linkTo="/schedule">
          <FiFileText />

          Períodos e Matérias
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
