import { useState } from "react";
import { Link } from "react-router-dom";
import { QueryObserverResult } from "react-query";
import { sortByDate } from "../../utils/sortByDate";
import { getDaysDiff } from "../../utils/getDaysDiff";
import useModal from "../../hooks/useModal";
import MentorshipModal from "../MentorshipModal/MentorshipModal";
import styles from "./UserMentorships.module.css";
import UserMentorshipsSkeleton from "../UserMentorshipsSkeleton/UserMentorshipsSkeleton";

interface AccountMentorshipsProps {
  data: QueryObserverResult;
  header: string;
  showMoreParam: string;
  showButtons: boolean;
}
export interface Mentorship {
  id: number;
  mentorId: number;
  senderId: number;
  background: string;
  createdAt: string;
  expectations: string;
  message: string;
  status: "Accepted" | "Pending" | "Rejected";
  user: {
    email: string;
  };
}

const UserMentorships = ({ data, header, showMoreParam, showButtons }: AccountMentorshipsProps) => {
  const [selectedItem, setSelectedItem] = useState<Mentorship>();
  const { isOpen, toggle } = useModal();
  const mentorships = data?.data as Mentorship[];
  const sortedData =
    mentorships?.length > 0
      ? mentorships.filter((el) => el.status === "Pending").sort(sortByDate)
      : [];
  return (
    <>
      {data.isLoading ? (
        <div className={styles.mentorshipsContainer}>
          <UserMentorshipsSkeleton />
        </div>
      ) : (
        <div className={styles.mentorshipsContainer} data-testid="mentorships">
          <h2>{header}</h2>
          <div className={styles.mentorshipsContainerItem}>
            {data.isLoading ? (
              <p>Loading</p>
            ) : mentorships.length > 0 ? (
              sortedData.map((el) => (
                <div
                  className={styles.mentorshipContainer}
                  key={el.message}
                  data-testid="mentorship"
                >
                  <div className={styles.mentorshipInfo}>
                    <p className={styles.mentorshipInfoParagraph} data-cy="email">
                      Email: {el.user.email ?? ""}
                    </p>
                    <p className={styles.mentorshipInfoParagraph} data-cy="message">
                      Message: {el.message}
                    </p>
                  </div>
                  <div className={styles.mentorshipButtons}>
                    {getDaysDiff(el.createdAt) < 3 ? (
                      <p className={styles.mentorshipStatus}>NEW</p>
                    ) : (
                      <span></span>
                    )}
                    <button
                      className={styles.mentorshipButton}
                      onClick={() => {
                        setSelectedItem(el);
                        toggle();
                      }}
                      data-cy="modalButton"
                    >
                      Show full request
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h3>Not found any mentorships</h3>
            )}
          </div>
          {mentorships.length > 0 && (
            <div className={styles.mentorshipLinkBox}>
              <Link className={styles.mentorshipLink} to={`/account/mentorships/${showMoreParam}`}>
                Check more mentorships
              </Link>
            </div>
          )}
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

export default UserMentorships;
