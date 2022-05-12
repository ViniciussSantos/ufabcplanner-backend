import { useMemo } from 'react';

import { SidebarButton } from '../SidebarButton';
import { MainLogo } from '../MainLogo';

import { pagesProps } from '../../hooks/usePageProps.hook';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const sidebarButtons = useMemo(() => {
    return Object.keys(pagesProps).map(key => {
      const { icon: Icon, title } = pagesProps[key];

      return (
        <SidebarButton key={key} linkTo={`/${key}`}>
          <Icon />

          {title}
        </SidebarButton>
      );
    });
  }, []);

  return (
    <div className={styles.sidebar}>
      <MainLogo />

      <div className={styles.btns_container}>
       {sidebarButtons}
      </div>
    </div>
  );
};

export default Sidebar;
