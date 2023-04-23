import { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

const Modal = ({ isOpen, toggle, children }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className={`${styles.modalOverlay}`} onClick={toggle} data-testid="overlay">
          <div onClick={(e) => e.stopPropagation()} className={styles.modalBox}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
