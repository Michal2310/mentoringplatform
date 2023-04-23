import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./DropdownMenu.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const DropdownMenu = ({ itemKey, dataArray, state, setState, isRadioButton, }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleChecked = (id, setState) => {
        setState((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const onRadioChange = (e) => {
        setState(e.target.value);
    };
    return (_jsxs("fieldset", { className: `${styles.dropdownMenuContainer}`, "data-testid": "dropdown", children: [_jsxs("button", { type: "button", onClick: () => setIsDropdownOpen((prev) => !prev), "data-cy": "openDropdownButton", className: styles.dropdownMenuButton, children: ["SELECT ", itemKey.toString().toUpperCase(), " ", !isDropdownOpen ? (_jsx(ArrowDropDownIcon, { sx: { fontSize: "32px" } })) : (_jsx(ArrowRightIcon, { sx: { fontSize: "32px" } }))] }), isDropdownOpen && (_jsx("div", { className: styles.dropdownMenuPanel, "data-testid": "panel", children: dataArray?.map((el) => (_jsx("div", { className: `${styles.dropdownMenuItem} ${state[`${el[itemKey]}`] ? styles.dropdownMenuInputChecked : ""}`, children: _jsx(_Fragment, { children: isRadioButton ? (_jsxs(_Fragment, { children: [_jsx("input", { id: String(`${el.id}-${el[itemKey]}`), name: el[itemKey], value: el[itemKey], type: "radio", checked: el[itemKey] === state, onChange: onRadioChange }), _jsx("label", { htmlFor: String(`${el.id}-${el[itemKey]}`), className: styles.dropdownMenuLabel, children: el[itemKey] })] })) : (_jsxs(_Fragment, { children: [_jsx("input", { id: String(`${el.id}-${el[itemKey]}`), name: el[itemKey], type: "checkbox", defaultChecked: state[`${el[itemKey]}`], onChange: () => toggleChecked(`${el[itemKey]}`, setState) }), _jsx("label", { "data-testid": "label", htmlFor: String(`${el.id}-${el[itemKey]}`), className: styles.dropdownMenuLabel, children: el[itemKey] })] })) }) }, el[itemKey]))) }))] }));
};
export default DropdownMenu;
