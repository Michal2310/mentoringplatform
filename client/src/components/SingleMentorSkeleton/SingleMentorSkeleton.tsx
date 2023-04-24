import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SingleMentorSkeleton.module.css";

const SingleMentorSkeleton = () => {
  return (
    <div className={styles.mentorContainer}>
      <div className={styles.mentorPhoto}>
        <Skeleton style={{ marginBottom: "1rem" }} circle width={80} height={80} />
      </div>
      <div>
        <Skeleton style={{ marginBottom: "1rem" }} width="35%" height="2rem" />
        <Skeleton style={{ marginBottom: "1rem" }} width="35%" height="2rem" />
        <Skeleton style={{ marginBottom: "1rem" }} height="2rem" />
        <Skeleton style={{ marginBottom: "1rem" }} height="2rem" />
      </div>
    </div>
  );
};

export default SingleMentorSkeleton;
