import { useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../FormError/FormError";
import styles from "./RecoveryPasswordLink.module.css";
import useApi from "../../hooks/useApi";
import RecoveryInfo from "../RecoveryInfo/RecoveryInfo";

export interface FormData {
  email: string;
}

const RecoveryPasswordLink = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const fetchData = useApi();
  const schema: ZodType<FormData> = z.object({
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["recovery"],
    mutationFn: async (FormData: FormData) =>
      fetchData(`/api/auth/recoverylink?email=${FormData.email}`, "post", false),
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: () => {
      setError("email", {
        message: "Invalid email",
      });
    },
  });

  const onSubmit = (FormData: FormData) => mutateAsync(FormData);

  return (
    <>
      {isSuccess ? (
        <RecoveryInfo
          header="Password reset email
      has been sent"
          text="A password reset email has been sent to your e-mail address."
        />
      ) : (
        <>
          <div className={styles.recoveryText}>
            <h1>Forgot your password?</h1>
            <p className={styles.recoveryTextParagraph}>
              Please enter your e-mail address bellow to receive your user and a new password
            </p>
          </div>
          <div>
            <form action="" onSubmit={handleSubmit(onSubmit)} className={styles.recoveryForm}>
              <div className={styles.recoveryFormContainer}>
                <input
                  type="email"
                  placeholder="Enter e-mail address"
                  {...register("email", {
                    required: "Please enter a valid email address",
                  })}
                  className={`${styles.recoveryFormInput} ${
                    errors.email || errors.root ? styles.inputError : ""
                  }`}
                />
                <FormError<FormData> errors={errors} errorKey={"email"} />
              </div>
              <input className={styles.recoverySubmit} type="submit" value="Reset password" />
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default RecoveryPasswordLink;
