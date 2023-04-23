import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import useApi from "../../hooks/useApi";
import { Token } from "../../context/authContext";
import FormError from "../../components/FormError/FormError";
import image from "../../assets/login-image.png";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}
interface RegisterResponse {
  tokens: Token;
}
const Register = () => {
  const navigation = useNavigate();
  const fetchData = useApi<RegisterResponse>();
  const schema: ZodType<FormData> = z
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
      path: ["confirmPassword", "password"],
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
    mutationKey: ["user"],
    mutationFn: async ({ email, password }: FormData) =>
      fetchData("/api/auth/register", "post", false, {
        data: {
          email,
          password,
        },
      }),
  });

  const onSubmit = async (formData: FormData) => {
    await mutateAsync(formData).then((result) => {
      if (!!result.tokens) {
        setError("email", {
          message: "Email already used",
        });
      } else {
        navigation("/login");
      }
    });
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerImageContainer}>
        <img className={styles.registerImage} src={image} alt="" />
        <h2 className={styles.registerImageHeader}>Lorem ipsum dolor sit amet</h2>
        <p>
          Quisque finibus lorem at est auctor ullamcorper. Curabitur leo arcu, malesuada ac ornare
          vel, sodales at orci.
        </p>
      </div>

      <div className={styles.registerFormContainer}>
        <div className={styles.registerFormContainerText}>
          <h1>Hello!</h1>
          <p className={styles.registerFormContainerTextParagraph}>
            We hope you will find what you are looking for
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
            <div className={styles.registerFormItem}>
              <input
                type="email"
                placeholder="Enter e-mail address"
                {...register("email", {
                  required: "Please enter a valid email address",
                })}
                className={`${styles.registerFormInput} ${
                  errors.email || errors.root ? styles.inputError : ""
                }`}
              />
              <FormError<FormData> errors={errors} errorKey={"email"} />
            </div>
            <div className={styles.registerFormItem}>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", { required: "Please enter a password" })}
                className={`${styles.registerFormInput} ${
                  errors.password || errors.root ? styles.inputError : ""
                }`}
              />
              <FormError<FormData> errors={errors} errorKey={"password"} />
            </div>
            <div className={styles.registerFormItem}>
              <input
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", { required: "Please enter a password" })}
                className={`${styles.registerFormInput} ${
                  errors.confirmPassword || errors.root ? styles.inputError : ""
                }`}
              />
              <FormError<FormData> errors={errors} errorKey={"confirmPassword"} />
            </div>
            <input className={styles.registerFormSubmit} type="submit" value={"Register now"} />
          </form>
        </div>
        <div className={styles.loginBox}>
          <div className={styles.loginBoxItem}>
            <p>
              Already a member?
              <Link to={"/login"} className={styles.loginBoxItemLink}>
                Log in now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
