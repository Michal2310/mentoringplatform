import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "react-query";
import { Mentorship } from "../../components/UserMentorships/UserMentorships";
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
  const sortedData = !isLoading ? (data as Mentorship[]) : [];
  useEffect(() => {
    if (mentorship !== "receivedRequests" && mentorship !== "myrequests") {
      navigate("/");
    } else if (mentorship === "receivedRequests") {
      setHeader("Mentorship requests");
    }
  }, []);
  return <Mentorships data={sortedData} isLoading={isLoading} header={header} />;
};

export default AccountMentorships;
