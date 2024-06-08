import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Outlet, useLocation } from 'react-router-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';

const modalRoot = document.getElementById('modals');

export const ModalLayout: FC<TModalProps> = ({ title, onClose, children }) => {
  const { state } = useLocation();

  return state?.background ? (
    <Modal title={title} onClose={onClose}>
      {children}
      <Outlet />
    </Modal>
  ) : (
    <>
      {children}
      <Outlet />
    </>
  );
};
export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
