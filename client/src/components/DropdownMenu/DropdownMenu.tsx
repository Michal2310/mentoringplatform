import { Dispatch, SetStateAction, useState } from "react";
import styles from "./DropdownMenu.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

interface DropdownMenuItem<T> {
  id: number;
  [key: string]: any;
}

interface DropdownMenuProps<T, S extends Record<string, any>> {
  itemKey: keyof T;
  dataArray: DropdownMenuItem<T>[];
  state: S;
  setState: Dispatch<SetStateAction<{}>>;
  isRadioButton?: boolean;
}

const DropdownMenu = <T, S extends Record<string, any>>({
  itemKey,
  dataArray,
  state,
  setState,
  isRadioButton,
}: DropdownMenuProps<T, S>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleChecked = (
    id: string,
    setState: Dispatch<
      SetStateAction<{
        [key: string]: boolean;
      }>
    >,
  ) => {
    setState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
  return (
    <fieldset className={`${styles.dropdownMenuContainer}`} data-testid="dropdown">
      <button
        type={"button"}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        data-cy="openDropdownButton"
        className={styles.dropdownMenuButton}
      >
        SELECT {itemKey.toString().toUpperCase()}{" "}
        {!isDropdownOpen ? (
          <ArrowDropDownIcon sx={{ fontSize: "32px" }} />
        ) : (
          <ArrowRightIcon sx={{ fontSize: "32px" }} />
        )}
      </button>
      {isDropdownOpen && (
        <div className={styles.dropdownMenuPanel} data-testid="panel">
          {dataArray?.map((el: any) => (
            <div
              key={el[itemKey]}
              className={`${styles.dropdownMenuItem} ${
                state[`${el[itemKey]}`] ? styles.dropdownMenuInputChecked : ""
              }`}
            >
              <>
                {isRadioButton ? (
                  <>
                    <input
                      id={String(`${el.id}-${el[itemKey]}`)}
                      name={el[itemKey]}
                      value={el[itemKey]}
                      type="radio"
                      checked={el[itemKey] === state}
                      onChange={onRadioChange}
                    />
                    <label
                      htmlFor={String(`${el.id}-${el[itemKey]}`)}
                      className={styles.dropdownMenuLabel}
                    >
                      {el[itemKey]}
                    </label>
                  </>
                ) : (
                  <>
                    <input
                      id={String(`${el.id}-${el[itemKey]}`)}
                      name={el[itemKey]}
                      type="checkbox"
                      defaultChecked={state[`${el[itemKey]}`]}
                      onChange={() => toggleChecked(`${el[itemKey]}`, setState)}
                    />
                    <label
                      data-testid="label"
                      htmlFor={String(`${el.id}-${el[itemKey]}`)}
                      className={styles.dropdownMenuLabel}
                    >
                      {el[itemKey]}
                    </label>
                  </>
                )}
              </>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
};

export default DropdownMenu;
