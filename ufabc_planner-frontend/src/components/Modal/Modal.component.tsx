import { forwardRef, useImperativeHandle, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { IconButton } from '../IconButton';

import styles from './Modal.module.scss';

interface Props {
  children: React.ReactNode;
  title: string;
}

export interface ModalRef {
  handleOpenModal: () => void;
}

const Modal = forwardRef<ModalRef, Props>(({ children, title }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    handleOpenModal: () => setOpen(true),
  }), []);

  if (!open) return <></>;

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <b className={styles.modal_title}>{title}</b>

          <IconButton onClick={() => setOpen(false)} icon={FiX}/>
        </div>

        {children}
      </div>
    </div>
  );
});

export default Modal;
