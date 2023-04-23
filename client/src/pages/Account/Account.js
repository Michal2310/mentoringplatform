import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "react-query";
import useApi from "../../hooks/useApi";
import UserInfo from "../../components/UserInfo/UserInfo";
import UserMentorships from "../../components/UserMentorships/UserMentorships";
const Account = () => {
    const fetchData = useApi();
    const receivedMentorships = useQuery(["receivedMentorships"], async () => fetchData("/api/mentorship/receivedRequests?limit=3", "get", true));
    const myMentorships = useQuery(["myMentorships"], async () => fetchData("/api/mentorship/myrequests?limit=3", "get", true));
    const mentorshipsAvailable = receivedMentorships.data && myMentorships.data;
    return (_jsxs(_Fragment, { children: [_jsx(UserInfo, {}), mentorshipsAvailable && (_jsxs(_Fragment, { children: [_jsx(UserMentorships, { data: receivedMentorships, header: "Mentorship requests", showMoreParam: "receivedRequests", showButtons: true }), _jsx(UserMentorships, { data: myMentorships, header: "My Mentorship requests", showMoreParam: "myrequests", showButtons: false })] }))] }));
};
export default Account;
