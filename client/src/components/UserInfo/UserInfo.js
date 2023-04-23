import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import ConstructionIcon from "@mui/icons-material/Construction";
import LanguageIcon from "@mui/icons-material/Language";
import styles from "./UserInfo.module.css";
const UserInfo = ({ userInit }) => {
    let user;
    if (!userInit?.id) {
        user = useContext(AuthContext).user;
    }
    else {
        user = userInit;
    }
    return (_jsx(_Fragment, { children: !user?.id ? null : (_jsxs("div", { className: styles.infoContainer, "data-testid": "userInfo", children: [_jsx("div", { className: styles.infoHeader, children: _jsx("h2", { "data-cy": "header", children: "Profile information" }) }), _jsxs("div", { className: styles.info__text, children: [_jsxs("div", { className: styles.infoIcon, children: [_jsx(EmailIcon, {}), _jsx("p", { className: styles.infoIconParagraph, "data-cy": "email", children: user.email })] }), _jsxs("div", { className: styles.infoIcon, children: [_jsx(ConstructionIcon, {}), _jsx("p", { className: `${styles.textCapitalize} ${styles.infoIconParagraph}`, "data-cy": "skills", children: user?.skills.map((el) => el.skill).join(", ") })] }), _jsxs("div", { className: styles.infoIcon, children: [_jsx(LanguageIcon, {}), _jsx("p", { className: `${styles.textCapitalize} ${styles.infoIconParagraph}`, "data-cy": "languages", children: user?.languages.map((el) => el.language).join(", ") })] }), _jsxs("div", { className: styles.infoIcon, children: [_jsx(InfoIcon, {}), _jsx("p", { className: styles.infoIconParagraph, "data-cy": "about", children: user.about })] }), _jsx("div", { className: styles.infoChangeBox, children: _jsx(Link, { className: styles.infoChangeBoxButton, to: "/account/update", children: "Change personal info" }) })] }, user.id)] })) }));
};
export default UserInfo;
