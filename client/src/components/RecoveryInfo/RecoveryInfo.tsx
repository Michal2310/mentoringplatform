import { Link } from "react-router-dom";
import styles from "./RecoveryInfo.module.css";
interface RecoveryInfoProps {
  header: string;
  text: string;
}

const RecoveryInfo = ({ header, text }: RecoveryInfoProps) => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoTextBox}>
        <h2 className={styles.infoTextBoxHeader}>{header}</h2>
        <p className={styles.infoTextBoxParagraph}>{text}</p>
      </div>
      <div>
        <Link className={styles.infoButton} to="/home">
          Return to home page
        </Link>
      </div>
    </div>
  );
};

export default RecoveryInfo;
