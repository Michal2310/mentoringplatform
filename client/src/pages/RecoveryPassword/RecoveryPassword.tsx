import styles from "./RecoveryPassword.module.css";
import image from "../../assets/recovery-image.png";
import RecoveryPasswordLink from "../../components/RecoveryPasswordLink/RecoveryPasswordLink";
import { useSearchParams } from "react-router-dom";
import RecoveryPasswordForm from "../../components/RecoveryPasswordForm/RecoveryPasswordForm";

const RecoveryPassword = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const isQueryContainsCode = searchParams.has("code");
  const code = searchParams.get("code")?.toString();

  return (
    <div className={styles.main}>
      <div className={styles.image}>
        <img src={image} alt="" />
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>
          Quisque finibus lorem at est auctor ullamcorper. Curabitur leo arcu, malesuada ac ornare
          vel, sodales at orci.
        </p>
      </div>
      <div className={styles.login}>
        {isQueryContainsCode ? <RecoveryPasswordForm code={code} /> : <RecoveryPasswordLink />}
      </div>
    </div>
  );
};

export default RecoveryPassword;
