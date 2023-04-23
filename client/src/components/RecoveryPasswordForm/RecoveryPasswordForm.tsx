import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./RecoveryPasswordForm.module.css";
import FormError from "../FormError/FormError";
import RecoveryInfo from "../RecoveryInfo/RecoveryInfo";
import useApi from "../../hooks/useApi";

export interface ChangePasswordFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface RecoveryPasswordFormProps {
  code: string | undefined;
}

const RecoveryPasswordForm = ({ code }: RecoveryPasswordFormProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const schema: ZodType<ChangePasswordFormData> = z
    .object({
      email: z.string().email(),
      password: z.string(),
      confirmPassword: z.string(),
    })
    .refine(({ password }) => password.trim().length >= 6, {
      message: "The password must be longer than 6 characters",
      path: ["password"],
    })
    .refine(({ confirmPassword }) => confirmPassword.trim().length >= 6, {
      message: "The password must be longer than 6 characters",
      path: ["confirmPassword"],
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(schema),
  });

  const fetchData = useApi();

  const { mutateAsync } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (FormData: ChangePasswordFormData) =>
      fetchData(`/api/auth/recoverypassword?code=${code}`, "post", false, {
        data: {
          email: FormData.email,
          password: FormData.password,
        },
      }),
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: () => {
      setError("email", {
        message: "Invalid email",
      });
    },
  });

  const onSubmit = async (FormData: ChangePasswordFormData) => await mutateAsync(FormData);

  return (
    <>
      {isSuccess ? (
        <RecoveryInfo
          header="New password confirmed successful"
          text="You have successfully confirm your new password. Please, use your new password when logging in."
        />
      ) : (
        <>
          <div className={styles.recoveryContainer} data-testid="passwordReset">
            <div className={styles.recoveryContainerItem}>
              <div className={styles.recoveryItemBox}>
                <h1>Please, enter a new password bellow!</h1>
              </div>
              <div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  data-testid="passwordResetForm"
                  className={styles.recoveryForm}
                >
                  <div className={styles.recoveryFormInputBox}>
                    <input
                      type="email"
                      placeholder="Enter e-mail address"
                      {...register("email", {
                        required: "Please enter a valid email address",
                      })}
                      className={`${styles.recoveryFormInput} ${
                        errors.email || errors.root ? styles.inputError : ""
                      }`}
                      data-cy-input="email"
                    />
                    <FormError<ChangePasswordFormData> errors={errors} errorKey={"email"} />
                  </div>
                  <div className={styles.recoveryFormInputBox}>
                    <input
                      type="password"
                      placeholder="Enter password"
                      {...register("password", { required: "Please enter a password" })}
                      className={`${styles.recoveryFormInput} ${
                        errors.password || errors.root ? styles.inputError : ""
                      }`}
                      data-cy-input="password"
                    />
                    <FormError<ChangePasswordFormData> errors={errors} errorKey={"password"} />
                  </div>
                  <div className={styles.recoveryFormInputBox}>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      {...register("confirmPassword", { required: "Please enter a password" })}
                      className={`${styles.recoveryFormInput} ${
                        errors.confirmPassword || errors.root ? styles.inputError : ""
                      }`}
                      data-cy-input="submitPassword"
                    />
                    <FormError<ChangePasswordFormData>
                      errors={errors}
                      errorKey={"confirmPassword"}
                    />
                  </div>
                  <input className={styles.submitForm} type="submit" value="Reset password" />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RecoveryPasswordForm;
