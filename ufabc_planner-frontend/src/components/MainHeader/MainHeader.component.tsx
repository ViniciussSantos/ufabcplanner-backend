import { useCallback } from 'react';
import { FiLogOut } from 'react-icons/fi';

import usePageProps from '../../hooks/usePageProps.hook';

import { Button } from '../Button';

import styles from './MainHeader.module.scss';

const MainHeader = () => {
  const { pageProps: { title, icon: Icon } } = usePageProps();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('auth_token');

    window.location.reload();
  }, []);

  return (
    <div className={styles.main_header}>
      <h2><Icon />{title}</h2>

      <Button btnType='secondary' style={{ width: '100px' }} onClick={handleLogout}>
        <FiLogOut/>Logout
      </Button>
    </div>
  );
};

export default MainHeader;
