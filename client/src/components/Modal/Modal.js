import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import styles from "./Modal.module.css";
const Modal = ({ isOpen, toggle, children }) => {
    return (_jsx(_Fragment, { children: isOpen && (_jsx("div", { className: `${styles.modalOverlay}`, onClick: toggle, "data-testid": "overlay", children: _jsx("div", { onClick: (e) => e.stopPropagation(), className: styles.modalBox, children: children }) })) }));
};
export default Modal;
