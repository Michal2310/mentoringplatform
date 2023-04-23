import { useContext, useState } from "react";
import { useQueries, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import useApi from "./useApi";
export const useAccountUpdate = () => {
    const fetchData = useApi();
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const [checkedSkills, setCheckedSkills] = useState({});
    const [checkedLanguages, setCheckedLanguages] = useState({});
    const [checkedCountry, setCheckedCountry] = useState({});
    const { "0": { data: skills }, "1": { data: languages }, "2": { data: country }, } = useQueries([
        {
            queryKey: ["skills"],
            queryFn: async () => await fetchData("/api/myaccount/skills", "get", false),
        },
        {
            queryKey: ["languages"],
            queryFn: async () => await fetchData("/api/myaccount/languages", "get", false),
        },
        {
            queryKey: ["country"],
            queryFn: async () => await fetchData("/api/myaccount/country", "get", false),
        },
    ]);
    const { mutateAsync } = useMutation({
        mutationKey: ["update", user.id],
        mutationFn: async ({ firstname, lastname, about, title }) => fetchData("/api/myaccount/update", "put", false, {
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
        onSuccess: () => {
            navigate("/account");
        },
    });
    const onSubmit = async (FormData) => {
        const res = (await mutateAsync(FormData));
        setUser((prev) => ({
            ...prev,
            ...res,
        }));
    };
    return {
        checkedSkills,
        setCheckedSkills,
        checkedLanguages,
        setCheckedLanguages,
        checkedCountry,
        setCheckedCountry,
        onSubmit,
        skills,
        languages,
        country,
    };
};
