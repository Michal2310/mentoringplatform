import { useQuery } from "react-query";
import { useParams } from "react-router";
import SingleMentor from "../../components/SingleMentor/SingleMentor";
import useApi from "../../hooks/useApi";

export type SingleMentorType = {
  id: number;
  email: string;
  about: null | string;
  firstname: string;
  country: {
    id: number;
    country: string;
  }[];
  languages: {
    id: number;
    language: string;
  }[];
  skills: {
    id: number;
    skill: string;
  }[];
  image: {
    fileUrl: string;
  }[];
};

const Mentor = () => {
  const fetchData = useApi<SingleMentorType>();
  const { mentorId } = useParams();
  const { data } = useQuery({
    queryKey: ["mentor", mentorId],
    queryFn: async () => await fetchData(`/api/mentor/${mentorId}`, "get", false),
  });
  return (
    <>
      <SingleMentor data={data} />
    </>
  );
};

export default Mentor;
