import { Mentorship } from "../components/UserMentorships/UserMentorships";

export const sortByDate = (a: Mentorship, b: Mentorship) => {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
};
