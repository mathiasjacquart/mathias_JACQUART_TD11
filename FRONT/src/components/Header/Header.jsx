import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext"
import { useContext } from "react";

function Header() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        <Link to="/"><strong> VidFuse </strong></Link>
      </div>
      <ul className={styles.headerList}>
        {user ? (
          <>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
          </>


        ):(
          <>
          <Link to="/register">Inscription</Link>
          <Link to="/login">Connexion</Link>
        </>
        )}

        
      </ul>
    </header>
  );
}

export default Header;
