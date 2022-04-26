import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div style={{ width: '100%', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={styles.loader} />
    </div>
  )
}

export default Loader;
