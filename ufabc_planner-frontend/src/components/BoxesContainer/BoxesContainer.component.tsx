import styles from './BoxesContainer.module.scss';

interface Props {
  children: React.ReactNode;
}

const BoxesContainer = ({ children }: Props) => {
  return (
    <div className={styles.boxes_container}>
      {children}
    </div>
  )
};

export default BoxesContainer;