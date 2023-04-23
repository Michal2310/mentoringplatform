import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./RecoveryPassword.module.css";
import image from "../../assets/recovery-image.png";
import RecoveryPasswordLink from "../../components/RecoveryPasswordLink/RecoveryPasswordLink";
import { useSearchParams } from "react-router-dom";
import RecoveryPasswordForm from "../../components/RecoveryPasswordForm/RecoveryPasswordForm";
const RecoveryPassword = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const isQueryContainsCode = searchParams.has("code");
    const code = searchParams.get("code")?.toString();
    return (_jsxs("div", { className: styles.main, children: [_jsxs("div", { className: styles.image, children: [_jsx("img", { src: image, alt: "" }), _jsx("h2", { children: "Lorem ipsum dolor sit amet" }), _jsx("p", { children: "Quisque finibus lorem at est auctor ullamcorper. Curabitur leo arcu, malesuada ac ornare vel, sodales at orci." })] }), _jsx("div", { className: styles.login, children: isQueryContainsCode ? _jsx(RecoveryPasswordForm, { code: code }) : _jsx(RecoveryPasswordLink, {}) })] }));
};
export default RecoveryPassword;
