import { useState } from "react";
import { Mentorship } from "../UserMentorships/UserMentorships";
import useModal from "../../hooks/useModal";
import MentorshipModal from "../MentorshipModal/MentorshipModal";
import styles from "./Mentorships.module.css";
import MentorshipsSkeleton from "../MentorshipsSkeleton/MentorshipsSkeleton";

interface MentorshipProps {
  header: string;
  data: Mentorship[];
  isLoading: boolean;
}
const Mentorships = ({ data, isLoading, header }: MentorshipProps) => {
  const { toggle, isOpen } = useModal();
  const [selectedItem, setSelectedItem] = useState<Mentorship>();
  const showButtons = header === "Mentorship requests" && selectedItem?.status === "Pending";
  return (
    <>
      {isLoading ? (
        <div className={styles.mentorshipsContainer}>
          <h2>{header}</h2>
          {Array.from({ length: 3 }).map((_, index) => (
            <MentorshipsSkeleton />
          ))}
        </div>
      ) : (
        <div className={styles.mentorshipsContainer} data-testid="mentorships">
          <h2>{header}</h2>
          {data.map((el) => (
            <div
              className={`${styles.mentorshipsItem} ${styles.mentorshipsItemBackground}`}
              key={el.message}
            >
              <div className={styles.mentorshipsItemInformation}>
                <p className={styles.mentorshipsItemInformationText} data-cy="email">
                  Email: {el.user.email ?? ""}
                </p>
                <p className={styles.mentorshipsItemInformationText} data-cy="message">
                  Message: {el.message}
                </p>
              </div>
              <div className={styles.mentorshipsItemButtons}>
                <p
                  data-cy="status"
                  className={`
                  ${styles.mentorshipsItemStatusText}
                  ${
                    el.status === "Accepted"
                      ? styles.statusAccepted
                      : el.status === "Pending"
                      ? styles.statusPending
                      : styles.statusRejected
                  }`}
                >
                  {el.status}
                </p>
                <button
                  className={styles.mentorshipsItemButton}
                  onClick={() => {
                    setSelectedItem(el);
                    toggle();
                  }}
                  data-cy="showModal"
                >
                  Show full request
                </button>
              </div>
            </div>
          ))}
          <MentorshipModal
            isOpen={isOpen}
            toggle={toggle}
            item={selectedItem}
            queryKey="receivedMentorships"
            showButtons={showButtons}
          />
        </div>
      )}
    </>
  );
};

export default Mentorships;
