import { useContext, useState } from "react";
import { useParams } from "react-router";
import { SingleMentorType } from "../../pages/Mentor/Mentor";
import { AuthContext } from "../../context/authContext";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ConstructionIcon from "@mui/icons-material/Construction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import styles from "./SingleMentor.module.css";
import useModal from "../../hooks/useModal";
import SingleMentorModal from "../SingleMentorModal/SingleMentorModal";

interface SingleMentorProps {
  data: SingleMentorType | undefined;
}

const SingleMentor = ({ data }: SingleMentorProps) => {
  const { isOpen, toggle } = useModal();
  const [starState, setStarState] = useState(false);
  const { mentorId } = useParams();
  const { user } = useContext(AuthContext);
  return (
    <>
      {data && (
        <div key={data.email} className={styles.mentorContainer} data-testid="mentor">
          <div className={styles.mentorProfile}>
            <div className={styles.mentorInformation}>
              <LocationOnIcon />
              <p
                data-cy="country"
                className={`${styles.mentorInformationParagraph} ${styles.textCapitalize}`}
              >
                {data.country[0].country}
              </p>
            </div>
            <img className={styles.mentorImage} src={data.image[0].fileUrl} />
            <button
              className={styles.starButton}
              onClick={() => setStarState((prev) => !prev)}
              data-testid="starButton"
            >
              {starState ? (
                <StarIcon data-testid="starIcon" />
              ) : (
                <StarBorderIcon data-testid="borderStarIcon" />
              )}
            </button>
          </div>
          <div>
            <div className={styles.mentorInformation}>
              <PermIdentityIcon />
              <p className={styles.mentorInformationParagraph} data-cy="firstname">
                {data.firstname}
              </p>
            </div>
            <div className={styles.mentorInformation}>
              <InfoIcon />
              <p className={styles.mentorInformationParagraph} data-cy="about">
                Bio: {data.about}
              </p>
            </div>
            <div className={styles.mentorInformation}>
              <ConstructionIcon />
              <p
                className={`${styles.mentorInformationParagraph} ${styles.textCapitalize}`}
                data-cy="skills"
              >
                {data?.skills.map((el: { skill: string }) => el.skill).join(", ")}
              </p>
            </div>
          </div>
          {user?.id && (
            <div className={styles.mentorButtons}>
              <button className={styles.mentorButton} onClick={toggle}>
                Apply for mentorship
              </button>
              <SingleMentorModal mentorId={Number(mentorId)} isOpen={isOpen} toggle={toggle} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SingleMentor;
