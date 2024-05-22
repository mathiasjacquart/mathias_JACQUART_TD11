import { useContext } from "react";
import styles from "./Homepage.module.scss"
import { UserContext } from "../../context/UserContext";
import Upload from "../../components/Upload";
export default function Homepage() {
  const {user} = useContext(UserContext)
    return (
    <div className="d-flex flex-row m-20 container">
     <div className={`${styles.videos}`}>
        <h2>Toutes les vidéos</h2>
        <div>
          CONTENU
        </div>
     </div>
     {!user ? (
      <div className={`${styles.addList}`}>
        <p>Pour ajouter une vidéo, il vous faut vous connecter dans "Login".</p>
      </div>

     ):(
      <div className={`${styles.addList}`}>
        <h2> Ajouter une vidéo </h2>
        <div>
          <Upload/>
        </div>
      </div>

     )

     }

    </div>
  );
}
