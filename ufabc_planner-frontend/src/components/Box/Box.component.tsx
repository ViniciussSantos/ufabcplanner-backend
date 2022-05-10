import clsx from 'clsx';
import { FiPlus } from 'react-icons/fi';

import { Button } from '../Button';

import styles from './Box.module.scss';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  flex?: boolean;
  onAdd?: () => void | Promise<void>;
  title?: string
  maxWidth?: string;
  height?: string;
}

const Box = ({ children, style, flex, onAdd, title, maxWidth, height }: Props) => {
  return (
    <div className={clsx(styles.box, { [styles.flex]: flex })} style={{ ...style, maxWidth: maxWidth ?? 'none', height: height ?? 'auto' }}>
      {(!!onAdd || !!title) &&
        <div className={styles.box_header}>
          {!!title && <b style={{ fontSize: '22px' }}>{title}</b>}

          {!!onAdd &&
            <Button onClick={onAdd} style={{ width: '40px', height: '40px' }}>
              <FiPlus size={20}/>
            </Button>
          }
        </div>
      }

      {children}
    </div>
  )
};

export default Box;