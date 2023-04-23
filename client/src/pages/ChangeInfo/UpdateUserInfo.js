import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAccountUpdate } from "../../hooks/useAccoutUpdate";
import ChangeInfoForm from "../../components/ChangeInfoForm/ChangeInfoForm";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
const UpdateUserInfo = () => {
    const { checkedSkills, setCheckedSkills, setCheckedLanguages, checkedCountry, setCheckedCountry, checkedLanguages, skills, country, languages, onSubmit, } = useAccountUpdate();
    return (_jsxs(_Fragment, { children: [_jsxs(ChangeInfoForm, { onSubmit: onSubmit, header: "Change your account information", children: [_jsx(DropdownMenu, { itemKey: "skill", dataArray: skills, state: checkedSkills, setState: setCheckedSkills }), _jsx(DropdownMenu, { itemKey: "language", dataArray: languages, state: checkedLanguages, setState: setCheckedLanguages }), _jsx(DropdownMenu, { itemKey: "country", dataArray: country, state: checkedCountry, setState: setCheckedCountry, isRadioButton: true })] }), _jsx(ChangePassword, {})] }));
};
export default UpdateUserInfo;
