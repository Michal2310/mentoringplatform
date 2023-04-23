import { useQuery } from "react-query";
import useApi from "../../hooks/useApi";
import UserInfo from "../../components/UserInfo/UserInfo";
import UserMentorships from "../../components/UserMentorships/UserMentorships";

const Account = () => {
  const fetchData = useApi();
  const receivedMentorships = useQuery(["receivedMentorships"], async () =>
    fetchData("/api/mentorship/receivedRequests?limit=3", "get", true),
  );
  const myMentorships = useQuery(["myMentorships"], async () =>
    fetchData("/api/mentorship/myrequests?limit=3", "get", true),
  );
  const mentorshipsAvailable = receivedMentorships.data && myMentorships.data;
  return (
    <>
      <UserInfo />
      {mentorshipsAvailable && (
        <>
          <UserMentorships
            data={receivedMentorships}
            header={"Mentorship requests"}
            showMoreParam="receivedRequests"
            showButtons
          />
          <UserMentorships
            data={myMentorships}
            header={"My Mentorship requests"}
            showMoreParam="myrequests"
            showButtons={false}
          />
        </>
      )}
    </>
  );
};

export default Account;
