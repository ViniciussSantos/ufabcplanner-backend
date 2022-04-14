import styles from './Box.module.scss';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Box = ({ children, style }: Props) => {
  return (
    <div className={styles.box} style={style}>
      {children}
    </div>
  )
};

export default Box;