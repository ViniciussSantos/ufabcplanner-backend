import styles from './SidebarButton.module.scss';

interface Props {
  children: React.ReactNode;
}

const SidebarButton = ({ children }: Props) => {
  return (
    <button className={styles.sidebar_btn}>{children}</button>
  );
};

export default SidebarButton;
