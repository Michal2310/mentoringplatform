import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import { getDaysDiff } from "../../utils/getDaysDiff";
import { Mentorship } from "../UserMentorships/UserMentorships";
import useApi from "../../hooks/useApi";
import Modal from "../Modal/Modal";
import styles from "./MentorshipModal.module.css";

interface MentorshipModalProps {
  isOpen: boolean;
  toggle: () => void;
  item: Mentorship | undefined;
  queryKey: string;
  showButtons: boolean;
}

enum StatusType {
  Accepted = "Accepted",
  Rejected = "Rejected",
}

const MentorshipModal = ({ isOpen, toggle, item, showButtons }: MentorshipModalProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchData = useApi();

  const updateMentorshipStatus = useMutation({
    mutationKey: ["updateMentorship", item?.id],
    mutationFn: async (status: StatusType) =>
      await fetchData(`/api/mentorship/${item?.id}?status=${status.toString()}`, "patch", true),
    onSuccess: () => {
      queryClient.invalidateQueries("mentorships");
      toggle();
    },
    onError: () => {
      navigate("/");
    },
  });

  return (
    <>
      {!!item && (
        <Modal isOpen={isOpen} toggle={toggle}>
          <div className={styles.modalContainer} data-testid="mentorshipModal">
            <>
              <div className={styles.mentorshipModalItemVer}>
                <p data-cy="modalEmail">Email: {item.user.email}</p>
                <p className={styles.mentorshipStatus}>
                  {getDaysDiff(item.createdAt) < 3 ? (
                    <p className={styles.mentorshipStatusText}>NEW</p>
                  ) : (
                    <span></span>
                  )}
                </p>
              </div>
              <div className={styles.mentorshipModalItemHor}>
                <p className={styles.mentorshipModalItemHorText} data-cy="modalMessage">
                  Message: {item.message}
                </p>
                <p className={styles.mentorshipModalItemHorText} data-cy="modalExpectations">
                  Expectations: {item.expectations}
                </p>
                <p className={styles.mentorshipModalItemHorText} data-cy="modalBackground">
                  Background: {item.background}
                </p>
              </div>
            </>
            <div className={styles.modalButtons} data-testid="modalButtons">
              {item && showButtons && (
                <>
                  <button
                    className={`${styles.modalButton} ${styles.modalRejectButton}`}
                    onClick={() => updateMentorshipStatus.mutate(StatusType.Rejected)}
                  >
                    DENY
                  </button>
                  <button
                    className={`${styles.modalButton} ${styles.modalAcceptButton}`}
                    onClick={() => updateMentorshipStatus.mutate(StatusType.Accepted)}
                  >
                    ACCEPT
                  </button>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MentorshipModal;
