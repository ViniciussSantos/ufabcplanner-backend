import styles from './MainLogo.module.scss';

const MainLogo = () => {
  return (
    <div className={styles.logo}>
      <img
        src="/UFABCplanner_logo.svg"
        alt="UFABCplanner_logo"
        width="200px"
      />
    </div>
  );
}

export default MainLogo;
