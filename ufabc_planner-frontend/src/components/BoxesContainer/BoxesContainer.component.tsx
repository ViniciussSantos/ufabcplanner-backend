import styles from './BoxesContainer.module.scss';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const BoxesContainer = ({ children, style }: Props) => {
  return (
    <div className={styles.boxes_container} style={style}>
      {children}
    </div>
  )
};

export default BoxesContainer;