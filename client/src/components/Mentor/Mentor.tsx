import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ConstructionIcon from "@mui/icons-material/Construction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import styles from "./Mentor.module.css";
import { MentorType } from "../../pages/Home/Home";
import useFavoriteMentor from "../../hooks/useFavoriteMentor";
import { AuthContext } from "../../context/authContext";

interface MentorProps {
  data: MentorType[] | undefined;
}

const Mentor = ({ data }: MentorProps) => {
  const { user } = useContext(AuthContext);
  const addFavoriteMentor = useFavoriteMentor(user.id);
  const [starState, setStarState] = useState<{ [key: string]: boolean }>(() => {
    const initialState: { [key: string]: boolean } = {};
    data?.forEach((el) => {
      initialState[el.user.email] = el.favoriteMentors.some(
        (favoriteMentor) => favoriteMentor.userId === user.id,
      );
    });
    return initialState;
  });

  const toggleStar = (email: string) => {
    setStarState((prevState) => ({
      ...prevState,
      [email]: !prevState[email],
    }));
  };

  const handleAddFavoriteMentor = async (mentorId: number) => {
    if (!user?.id) return;
    try {
      await addFavoriteMentor(mentorId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.mentorContainer}>
      {data?.map((el) => (
        <div key={el.user.email} className={styles.mentorContainerItem} data-testid="mentor">
          <div className={styles.mentorItemProfile}>
            <div className={styles.mentorItemProfileInformation}>
              <LocationOnIcon />
              <p data-cy="country" className={styles.textCapitalize}>
                {el.user.country[0].country}
              </p>
            </div>
            <img className={styles.mentor__profile__image} src={el.user.image[0].fileUrl} />
            <button
              className={styles.starButton}
              data-testid="starButton"
              onClick={() => {
                toggleStar(el.user.email);
                handleAddFavoriteMentor(el.user.id);
              }}
            >
              {starState[el.user.email] ? <StarIcon /> : <StarBorderIcon />}
            </button>
          </div>
          <>
            <div className={styles.mentorItemProfileInformation}>
              <PermIdentityIcon />
              <p className={styles.mentorItemProfileInformationText} data-cy="firstname">
                {el.user.firstname}
              </p>
            </div>
            <div className={styles.mentorItemProfileInformation}>
              <InfoIcon />
              <p className={styles.mentorItemProfileInformationText} data-cy="about">
                Bio: {el.user.about}
              </p>
            </div>
            <div className={styles.mentorItemProfileInformation}>
              <ConstructionIcon />
              <p
                className={`${styles.mentorItemProfileInformationText} ${styles.textCapitalize}`}
                data-cy="skills"
              >
                {el?.user?.skills.map((el: { skill: string }) => el.skill).join(", ")}
              </p>
            </div>
          </>
          <div className={styles.mentorButton}>
            <Link
              to={`/mentor/${el.user.id}`}
              className={styles.mentorButtonLink}
              data-testid="link"
            >
              Show full profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mentor;
