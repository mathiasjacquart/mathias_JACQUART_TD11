import { useContext } from "react";
import styles from "./Homepage.module.scss"
import { UserContext } from "../../context/UserContext";
import Upload from "../../components/Videos/Upload";
import GetVideos from "../../components/Videos/GetVideos"

export default function Homepage() {
  const {user} = useContext(UserContext)
    return (
    <div className={`container ${styles.HomeContainer}`}>
     <div className={`${styles.videos}`}>
        <h2>Toutes les vidéos</h2>
        <GetVideos/>
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
