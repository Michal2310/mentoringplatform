import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import useApi from "../../hooks/useApi";
import Modal from "../Modal/Modal";
import styles from "./SingleMentorModal.module.css";
import FormError from "../FormError/FormError";

interface SingleMentorModalProps {
  mentorId: number;
  isOpen: boolean;
  toggle: () => void;
}

interface FormData {
  background: string;
  expectations: string;
  message: string;
}

const SingleMentorModal = ({ mentorId, isOpen, toggle }: SingleMentorModalProps) => {
  const fetchData = useApi();
  const schema: ZodType<FormData> = z
    .object({
      background: z.string(),
      expectations: z.string(),
      message: z.string(),
    })
    .refine(({ background }) => background.trim().length > 0, {
      message: "Background field cannot be empty",
      path: ["background"],
    })
    .refine(({ expectations }) => expectations.trim().length > 0, {
      message: "Expectations field cannot be empty",
      path: ["expectations"],
    })
    .refine(({ message }) => message.trim().length > 0, {
      message: "Message field cannot be empty",
      path: ["message"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["user"],
    mutationFn: async ({ background, expectations, message }: FormData) =>
      fetchData(`/api/mentorship/${mentorId}`, "post", true, {
        data: {
          background,
          expectations,
          message,
        },
      }),
  });

  const onSubmit = async (formData: FormData) => {
    await mutateAsync(formData).then((result) => {
      toggle();
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <form action="" onSubmit={handleSubmit(onSubmit)} className={styles.mentorForm}>
        <div className={styles.mentorFormItem}>
          <label htmlFor="background" className={styles.mentorFormItemLabel}>
            Background
          </label>
          <textarea
            data-cy-input="background"
            id="background"
            className={`${styles.mentorFormItemTextarea}${
              errors.background || errors.root ? styles.inputError : ""
            }`}
            {...register("background")}
          />
          <FormError<FormData> errors={errors} errorKey={"background"} />
        </div>
        <div className={styles.mentorFormItem}>
          <label htmlFor="expectations" className={styles.mentorFormItemLabel}>
            Expectations
          </label>
          <textarea
            className={`${styles.mentorFormItemTextarea}${
              errors.expectations || errors.root ? styles.inputError : ""
            }`}
            data-cy-input="expectations"
            id="expectations"
            {...register("expectations")}
          />
          <FormError<FormData> errors={errors} errorKey={"expectations"} />
        </div>
        <div className={styles.mentorFormItem}>
          <label htmlFor="message" className={styles.mentorFormItemLabel}>
            Message
          </label>
          <textarea
            data-cy-input="message"
            id="message"
            className={`${styles.mentorFormItemTextarea}${
              errors.message || errors.root ? styles.inputError : ""
            }`}
            {...register("message")}
          />
          <FormError<FormData> errors={errors} errorKey={"message"} />
        </div>
        <input className={styles.mentorFormSubmit} type="submit" value={"Send"} />
      </form>
    </Modal>
  );
};

export default SingleMentorModal;
