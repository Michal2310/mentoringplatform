import { useQuery } from "react-query";
import useApi from "../../hooks/useApi";
import Mentor from "../../components/Mentor/Mentor";

export type MentorType = {
  id: number;
  status: string;
  favoriteMentors: {
    id: number;
    mentorId: number;
    userId: number;
  }[];
  user: {
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
};
const Home = () => {
  const fetchData = useApi<MentorType[]>();

  const { data, isLoading } = useQuery({
    queryKey: ["mentors", 1],
    queryFn: async () =>
      await fetchData("/api/mentor/mentors", "get", false, {
        params: {
          page: 1,
        },
      }),
  });

  return (
    <>
      <Mentor data={data} isLoading={isLoading} />
    </>
  );
};

export default Home;
