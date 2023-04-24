import Skeleton from "react-loading-skeleton";
import styles from "./MentorSkeleton.module.css";
import "react-loading-skeleton/dist/skeleton.css";

const MentorSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonImage}>
        <Skeleton circle width="5rem" height="5rem" />
      </div>
      <div className={styles.skeletonInfo}>
        <Skeleton style={{ marginBottom: "1rem" }} width="30%" />
        <Skeleton style={{ marginBottom: "1rem" }} width="30%" />
        <Skeleton style={{ marginBottom: "1rem" }} height="5rem" />
        <Skeleton style={{ marginBottom: "4rem" }} />
        <div className={styles.skeletonButton}>
          <Skeleton width="30%" height="2rem" />
        </div>
      </div>
    </div>
  );
};

export default MentorSkeleton;
