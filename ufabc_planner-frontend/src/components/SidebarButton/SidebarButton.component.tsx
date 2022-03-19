import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

import styles from './SidebarButton.module.scss';

interface Props {
  children: React.ReactNode;
  selected?: boolean;
  linkTo: string;
}

const SidebarButton = ({ children, selected, linkTo }: Props) => {
  const { pathname } = useLocation();

  return (
    <Link to={linkTo} style={{ textDecoration: 'none' }}>
      <button className={clsx(styles.sidebar_btn, { [styles.selected]: pathname.includes(linkTo) })}>
        {children}
      </button>
    </Link>
  );
};

export default SidebarButton;
