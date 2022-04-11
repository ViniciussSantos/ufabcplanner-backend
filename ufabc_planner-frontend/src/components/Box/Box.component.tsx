import styles from './Box.module.scss';

interface Props {
  children: React.ReactNode;
}

const Box = ({ children }: Props) => {
  // teste

  //teste 2

  return (
    <div className={styles.box}>
      {children}
    </div>
  )
};

export default Box;