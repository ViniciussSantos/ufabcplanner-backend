import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/auth';

import usePageProps from '../../hooks/usePageProps.hook';

import { Button } from '../Button';

import styles from './MainHeader.module.scss';

const MainHeader = () => {
  const { pageProps: { title, icon: Icon } } = usePageProps();

  const { logout } = useAuth();

  return (
    <div className={styles.main_header}>
      <h2><Icon />{title}</h2>

      <Button btnType='secondary' style={{ width: '100px' }} onClick={logout}>
        <FiLogOut/>Logout
      </Button>
    </div>
  );
};

export default MainHeader;
