import styles from './PageLayout.module.scss';

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <div className={styles.page_layout}>
      {children}
    </div>
  );
};

export default PageLayout;
