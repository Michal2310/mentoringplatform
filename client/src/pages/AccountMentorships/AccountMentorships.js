import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "react-query";
import useApi from "../../hooks/useApi";
import Mentorships from "../../components/Mentorships/Mentorships";
const AccountMentorships = () => {
    const fetchData = useApi();
    const navigate = useNavigate();
    const { mentorship } = useParams();
    const [header, setHeader] = useState("My Mentorship requests");
    const { data, isLoading } = useQuery({
        queryKey: ["mentorships"],
        queryFn: async () => await fetchData(`/api/mentorship/${mentorship}?limit=5`, "get", true),
    });
    const sortedData = !isLoading ? data : [];
    useEffect(() => {
        if (mentorship !== "receivedRequests" && mentorship !== "myrequests") {
            navigate("/");
        }
        else if (mentorship === "receivedRequests") {
            setHeader("Mentorship requests");
        }
    }, []);
    return _jsx(Mentorships, { data: sortedData, isLoading: isLoading, header: header });
};
export default AccountMentorships;
