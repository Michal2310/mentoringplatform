import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import styles from "./Navbar.module.css";

interface NavbarProps {
  isOpen: Boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isOpen, setIsOpen }: NavbarProps) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 768) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setIsMobile(true);
    }
  }, []);
  const setOpen = () => {
    if (isMobile) {
      isOpen ? (document.body.style.overflow = "auto") : (document.body.style.overflow = "hidden");
      setIsOpen((prev) => !prev);
    }
  };
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarButtonBox}>
          <button
            className={`${styles.navbarButton} ${isOpen ? styles.navbarActiveButton : ""}`}
            data-cy="navbar__button"
            onClick={setOpen}
          ></button>
        </div>
        {isOpen && (
          <div className={styles.navbarModal}>
            {!!user.id ? (
              <>
                <img className={styles.navbarModalImage} src={user.image[0].fileUrl} alt="" />
                <div className={styles.navbarModalItems}>
                  <Link onClick={setOpen} className={styles.navbarModalItem} to={"/"}>
                    Home
                  </Link>
                  <Link onClick={setOpen} className={styles.navbarModalItem} to={"/account"}>
                    Account
                  </Link>
                  {!user.isMentor && (
                    <Link onClick={setOpen} className={styles.navbarModalItem} to={"/becomementor"}>
                      Become mentor
                    </Link>
                  )}
                  <Link onClick={setOpen} className={styles.navbarModalItem} to={"/logout"}>
                    Log out
                  </Link>
                </div>
              </>
            ) : (
              <div className={styles.navbarModalItems}>
                <Link onClick={setOpen} className={styles.navbarModalItem} to={"/"}>
                  Home
                </Link>
                <Link onClick={setOpen} className={styles.navbarModalItem} to={"/login"}>
                  Login
                </Link>
                <Link onClick={setOpen} className={styles.navbarModalItem} to={"/register"}>
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
