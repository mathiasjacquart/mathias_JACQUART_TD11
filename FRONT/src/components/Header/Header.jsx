import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";

function Header() {
  const { user } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <header className={styles.header}>
      <div className="flex-fill">
        <Link to="/"><strong>VidFuse</strong></Link>
      </div>
      <div className={styles.burger} onClick={handleToggle}>
        <span style={{ transform: toggle ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)' }}></span>
        <span style={{ opacity: toggle ? '0' : '1' }}></span>
        <span style={{ transform: toggle ? 'rotate(-45deg) translate(5px, -5px)' : 'rotate(0)' }}></span>
      </div>
      <ul className={`${styles["nav-links"]} ${toggle ? styles["nav-active"] : ""}`}>
        {user ? (
          <>
            <li>
              <Link to="/profile" onClick={() => setToggle(false)}>Profile</Link>
            </li>
            <li>
              <Link to="/logout" onClick={() => setToggle(false)}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register" onClick={() => setToggle(false)}>Inscription</Link>
            </li>
            <li>
              <Link to="/login" onClick={() => setToggle(false)}>Connexion</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
