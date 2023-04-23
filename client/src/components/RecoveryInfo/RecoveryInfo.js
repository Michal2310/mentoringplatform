import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import styles from "./RecoveryInfo.module.css";
const RecoveryInfo = ({ header, text }) => {
    return (_jsxs("div", { className: styles.infoContainer, children: [_jsxs("div", { className: styles.infoTextBox, children: [_jsx("h2", { className: styles.infoTextBoxHeader, children: header }), _jsx("p", { className: styles.infoTextBoxParagraph, children: text })] }), _jsx("div", { children: _jsx(Link, { className: styles.infoButton, to: "/home", children: "Return to home page" }) })] }));
};
export default RecoveryInfo;
