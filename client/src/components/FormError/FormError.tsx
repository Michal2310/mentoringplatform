import { FieldErrors, FieldValues } from "react-hook-form";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import styles from "./FormError.module.css";

interface Props<T extends FieldValues> {
  errors: FieldErrors<T>;
  errorKey: keyof T;
}

const FormError = <T extends FieldValues>({ errors, errorKey }: Props<T>) => {
  return (
    <>
      {errors[errorKey]?.message ? (
        <p data-cy="error" className={styles.fromError}>
          <>
            <WarningAmberIcon className={styles.fromErrorIcon} />
            {errors[errorKey]?.message}
          </>
        </p>
      ) : null}
    </>
  );
};

export default FormError;
