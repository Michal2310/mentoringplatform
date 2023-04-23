import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import styles from "./FormError.module.css";
const FormError = ({ errors, errorKey }) => {
    return (_jsx(_Fragment, { children: errors[errorKey]?.message ? (_jsx("p", { "data-cy": "error", className: styles.fromError, children: _jsxs(_Fragment, { children: [_jsx(WarningAmberIcon, { className: styles.fromErrorIcon }), errors[errorKey]?.message] }) })) : null }));
};
export default FormError;
