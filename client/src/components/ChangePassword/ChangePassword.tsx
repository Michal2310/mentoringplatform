import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../FormError/FormError";
import styles from "./ChangePassword.module.css";
import useApi from "../../hooks/useApi";

interface FormData {
  currentPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
  const fetchData = useApi();
  const navigate = useNavigate();
  const schema: ZodType<FormData> = z
    .object({
      currentPassword: z.string(),
      newPassword: z.string(),
    })
    .refine(({ currentPassword }) => currentPassword.trim().length >= 6, {
      message: "The current password field must be longer than 6 characters",
      path: ["currentPassword"],
    })
    .refine(({ newPassword }) => newPassword.trim().length >= 6, {
      message: "The new password field must be longer than 6 characters",
      path: ["newPassword"],
    });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async ({ currentPassword, newPassword }: FormData) =>
      fetchData("/api/account/", "put", true, {
        data: {
          oldPassword: currentPassword,
          newPassword,
        },
      }),
    onSuccess: () => {
      navigate("/account");
    },
    onError: () => {
      alert("Incorrect password. Please try again.");
    },
  });

  const onSubmit = async (FormData: FormData) => {
    try {
      const res = await mutateAsync(FormData);
    } catch (error) {
      setError("currentPassword", {
        message: "Incorrect password. Please try again.",
      });
    }
  };

  return (
    <div className={styles.infoContainer} data-testid="changePassword">
      <h2>Change your current password</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)} id="form">
        <div className={styles.formItem}>
          <label htmlFor="currentPassword" className={styles.label}>
            Current password
          </label>
          <input
            id="currentPassword"
            type="text"
            className={`${styles.input} ${
              errors.currentPassword || errors.root ? styles.inputError : ""
            }`}
            {...register("currentPassword")}
            data-cy-input="currentPassword"
          />
          <FormError<FormData> errors={errors} errorKey={"currentPassword"} />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="newPassword" className={styles.label}>
            New password
          </label>
          <input
            id="newPassword"
            type="text"
            className={`${styles.input} ${
              errors.newPassword || errors.root ? styles.inputError : ""
            }`}
            {...register("newPassword")}
            data-cy-input="newPassword"
          />
          <FormError<FormData> errors={errors} errorKey={"newPassword"} />
        </div>
        <input type="submit" className={styles.fromSubmit} value={"Change password"} />
      </form>
    </div>
  );
};

export default ChangePassword;
