import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./MentorshipsSkeleton.module.css";
const MentorshipsSkeleton = () => {
  return (
    <>
      <Skeleton style={{ marginBottom: "1rem" }} width="100%" height="4rem" />
    </>
  );
};

export default MentorshipsSkeleton;
