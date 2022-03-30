import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

const Button = ({ children, loading, ...rest }: Props) => {
  return (
    <button {...rest} className={styles.primary_btn}>
      {loading ? 'Carregando...' : children}
    </button>
  );
};

export default Button;
