import clsx from 'clsx';
import { IconBaseProps } from 'react-icons';

import styles from './IconButton.module.scss';

interface Props {
  icon: React.ComponentType<IconBaseProps>;
  btnType?: 'standard' | 'primary' | 'error';
  onClick: () => void;
}

const IconButton = ({ icon: Icon, btnType = 'standard', onClick }: Props) => {
  return (
    <div className={clsx(styles.icon_button, styles[btnType])} onClick={onClick}>
      <Icon size={20}/>
    </div>
  );
};

export default IconButton;
