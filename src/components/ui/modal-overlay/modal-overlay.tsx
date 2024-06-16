import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div cypress-test='modal-overlay'>
    <div className={styles.overlay} onClick={onClick} />
  </div>
);
