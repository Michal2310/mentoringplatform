import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "react-query";
import useApi from "../../hooks/useApi";
import Mentor from "../../components/Mentor/Mentor";
const Home = () => {
    const fetchData = useApi();
    const { data } = useQuery({
        queryKey: ["mentors", 1],
        queryFn: async () => await fetchData("/api/mentor/mentors", "get", false, {
            params: {
                page: 1,
            },
        }),
    });
    return (_jsx(_Fragment, { children: _jsx(Mentor, { data: data }) }));
};
export default Home;
