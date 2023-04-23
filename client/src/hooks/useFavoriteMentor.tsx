import { useMutation } from "react-query";
import useApi from "./useApi";

const useFavoriteMentor = (userId: number) => {
  const fetchData = useApi();
  const { mutateAsync: addFavoriteMentor } = useMutation({
    mutationKey: ["favorite", userId],
    mutationFn: async (mentorId: number) =>
      await fetchData(`/api/mentor/favoritementor/${mentorId}`, "post", true, {
        data: {
          userId,
          mentorId,
        },
      }),
  });
  return addFavoriteMentor;
};

export default useFavoriteMentor;
