import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

import { Loader } from '../Loader';

import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  btnType?: 'primary' | 'secondary';
}

const Button = ({ children, loading, btnType = 'primary', ...rest }: Props) => {
  return (
    <button {...rest} className={clsx(styles.default_btn, styles[btnType])}>
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
