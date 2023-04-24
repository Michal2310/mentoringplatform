import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserMentorshipsSkeleton = () => {
  return (
    <div>
      <Skeleton style={{ marginBottom: "1rem" }} height="2rem" width="30%" />
      <Skeleton style={{ marginBottom: "1rem" }} height="2rem" />
    </div>
  );
};

export default UserMentorshipsSkeleton;
