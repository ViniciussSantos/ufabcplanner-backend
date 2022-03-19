import styles from './PageLayout.module.scss';

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <div className={styles.page_layout}>
      <div className={styles.page_content}>
        {children}
      </div>

      <div className={styles.footer}>
        Footer legalzinho pro UFABCplanner | 2022
      </div>
    </div>
  );
};

export default PageLayout;
