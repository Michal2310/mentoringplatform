import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import SingleMentor from "../../components/SingleMentor/SingleMentor";
import useApi from "../../hooks/useApi";
const Mentor = () => {
    const fetchData = useApi();
    const { mentorId } = useParams();
    const { data } = useQuery({
        queryKey: ["mentor", mentorId],
        queryFn: async () => await fetchData(`/api/mentor/${mentorId}`, "get", false),
    });
    return (_jsx(_Fragment, { children: _jsx(SingleMentor, { data: data }) }));
};
export default Mentor;
