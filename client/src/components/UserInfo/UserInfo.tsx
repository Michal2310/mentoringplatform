import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, User } from "../../context/authContext";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import ConstructionIcon from "@mui/icons-material/Construction";
import LanguageIcon from "@mui/icons-material/Language";
import styles from "./UserInfo.module.css";

interface UserInfoProps {
  userInit?: User;
}

const UserInfo = ({ userInit }: UserInfoProps) => {
  let user: User;
  if (!userInit?.id) {
    user = useContext(AuthContext).user;
  } else {
    user = userInit;
  }
  return (
    <>
      {!user?.id ? null : (
        <div className={styles.infoContainer} data-testid="userInfo">
          <div className={styles.infoHeader}>
            <h2 data-cy="header">Profile information</h2>
          </div>
          <div className={styles.info__text} key={user.id}>
            <div className={styles.infoIcon}>
              <EmailIcon />
              <p className={styles.infoIconParagraph} data-cy="email">
                {user.email}
              </p>
            </div>
            <div className={styles.infoIcon}>
              <ConstructionIcon />
              <p
                className={`${styles.textCapitalize} ${styles.infoIconParagraph}`}
                data-cy="skills"
              >
                {user?.skills.map((el: { skill: string }) => el.skill).join(", ")}
              </p>
            </div>
            <div className={styles.infoIcon}>
              <LanguageIcon />
              <p
                className={`${styles.textCapitalize} ${styles.infoIconParagraph}`}
                data-cy="languages"
              >
                {user?.languages.map((el: { language: string }) => el.language).join(", ")}
              </p>
            </div>
            <div className={styles.infoIcon}>
              <InfoIcon />
              <p className={styles.infoIconParagraph} data-cy="about">
                {user.about}
              </p>
            </div>
            <div className={styles.infoChangeBox}>
              <Link className={styles.infoChangeBoxButton} to="/account/update">
                Change personal info
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
