import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import styles from "./Navbar.module.css";
const Navbar = ({ isOpen, setIsOpen }) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (window.innerWidth > 768) {
            setIsOpen(true);
        }
        else {
            setIsOpen(false);
            setIsMobile(true);
        }
    }, []);
    const setOpen = () => {
        if (isMobile) {
            isOpen ? (document.body.style.overflow = "auto") : (document.body.style.overflow = "hidden");
            setIsOpen((prev) => !prev);
        }
    };
    const { user } = useContext(AuthContext);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: styles.navbarContainer, children: [_jsx("div", { className: styles.navbarButtonBox, children: _jsx("button", { className: `${styles.navbarButton} ${isOpen ? styles.navbarActiveButton : ""}`, "data-cy": "navbar__button", onClick: setOpen }) }), isOpen && (_jsx("div", { className: styles.navbarModal, children: !!user.id ? (_jsxs(_Fragment, { children: [_jsx("img", { className: styles.navbarModalImage, src: user.image[0].fileUrl, alt: "" }), _jsxs("div", { className: styles.navbarModalItems, children: [_jsx(Link, { onClick: setOpen, className: styles.navbarModalItem, to: "/", children: "Home" }), _jsx(Link, { onClick: setOpen, className: styles.navbarModalItem, to: "/account", children: "Account" }), !user.isMentor && (_jsx(Link, { onClick: setOpen, className: styles.navbarModalItem, to: "/becomementor", children: "Become mentor" })), _jsx(Link, { onClick: setOpen, className: styles.navbarModalItem, to: "/logout", children: "Log out" })] })] })) : (_jsxs("div", { className: styles.navbarModalItems, children: [_jsx(Link, { onClick: setOpen, className: styles.navbarModalItem, to: "/", children: "Home" }), _jsx(Link, { onClick: setOpen, className: styles.navbarModalItem, to: "/login", children: "Login" }), _jsx(Link, { onClick: setOpen, className: styles.navbarModalItem, to: "/register", children: "Register" })] })) }))] }) }));
};
export default Navbar;
