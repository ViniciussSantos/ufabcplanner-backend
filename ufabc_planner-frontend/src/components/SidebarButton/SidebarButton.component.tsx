import clsx from 'clsx';

import styles from './SidebarButton.module.scss';

interface Props {
  children: React.ReactNode;
  selected?: boolean;
}

const SidebarButton = ({ children, selected }: Props) => {
  return (
    <button className={clsx(styles.sidebar_btn, { [styles.selected]: selected })}>
      {children}
    </button>
  );
};

export default SidebarButton;
