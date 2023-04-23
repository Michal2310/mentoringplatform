import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMutation } from "react-query";
import { useAccountUpdate } from "../../hooks/useAccoutUpdate";
import ChangeInfoForm from "../../components/ChangeInfoForm/ChangeInfoForm";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import useApi from "../../hooks/useApi";
const BecomeMentor = () => {
    const fetchData = useApi();
    const { checkedSkills, checkedCountry, checkedLanguages, country, skills, languages, onSubmit, setCheckedCountry, setCheckedLanguages, setCheckedSkills, } = useAccountUpdate();
    const { mutateAsync: becomeMentorAsync } = useMutation({
        mutationKey: ["createMentor"],
        mutationFn: async ({ firstname, lastname, about, title }) => await fetchData("mentor", "post", true, {
            data: {
                firstname,
                lastname,
                about,
                title,
                country: checkedCountry,
                skills: Object.keys(checkedSkills),
                languages: Object.keys(checkedLanguages),
            },
        }),
    });
    const onBecomeMentor = async (FormData) => {
        await becomeMentorAsync(FormData);
        await onSubmit(FormData);
    };
    return (_jsx(_Fragment, { children: _jsxs(ChangeInfoForm, { onSubmit: onBecomeMentor, header: "Become mentor", children: [_jsx(DropdownMenu, { itemKey: "skill", dataArray: skills, state: checkedSkills, setState: setCheckedSkills }), _jsx(DropdownMenu, { itemKey: "language", dataArray: languages, state: checkedLanguages, setState: setCheckedLanguages }), _jsx(DropdownMenu, { itemKey: "country", dataArray: country, state: checkedCountry, setState: setCheckedCountry, isRadioButton: true })] }) }));
};
export default BecomeMentor;
