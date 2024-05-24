import  { useEffect, useState} from "react";
import { getAllVideos } from "../../apis/videos"; 
import styles from "./GetVideo.module.scss"


// import OneVideo from "./OneVideo";

export default function VideoList() {
  const [allVideo, setAllVideo] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const videosFromApi = await getAllVideos();
        setAllVideo(videosFromApi);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVideos();
  }, []);
  

  return (
    <>
      {allVideo.length > 0 ? (
        allVideo.map((video) => (
          <>
          <video
              key={video._id}
              src={video.videoUrl}
              controls
              className={`${styles.videoItem}`}
          />
        <div className={`d-flex flex-column ${styles.videoInfos}`}>
      <div className="d-flex flex-row">
            <p>{video.title}</p>
            <div>
              <p>{video.timeAgo}</p>
            </div>
          </div> 
          <div className="d-flex flex-row"> 
            <div>
              {/* <img src="" alt="avatar" /> */}
            </div>
            <div>
              {/* <p> By {video.username} </p> */}
            </div>
            <div></div>
          </div>
        </div>

        </>

        ))
      ) : (
        <p>Pas de vidéos disponible</p>
      )}
  </>
  );
}
