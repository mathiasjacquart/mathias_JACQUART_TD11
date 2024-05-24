import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addVideo } from "../../apis/videos";

export default function Upload() {
  const [video, setVideo] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoProgress, setVideoProgress] = useState(0);
  const [allVideo, setAllVideo] = useState([]);

  useEffect(() => {
    video && uploadFile(video);
  }, [video]);

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "videos/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setVideoProgress(Math.round(progress));
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setVideoLink(downloadUrl.toString())
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVideo = await addVideo(videoLink, videoTitle);
      setAllVideo([...allVideo, newVideo]);
      setVideo(null);
      setVideoLink("");
      setVideoTitle("")
      setVideoProgress(0);
      const inputVideo = document.getElementById("video");
      const inputTitre = document.getElementById("titre");
      inputVideo.value = "";
      inputTitre.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-20 m-20">
        <div className="d-flex flex-column mb-20">
          <label htmlFor="video" className="mb-10">
            Video :
          </label>
          {videoProgress > 0 ? "Téléchargement: " + videoProgress + "%" : ""}
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={(e) => setVideo(() => e.target.files[0])}
          />
        </div>
        <div className="d-flex flex-column mb-20">
          <label htmlFor="titre" className="mb-10">
            Titre : 
          </label>
          <input
            type="text"
            id="titre"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Upload</button>
      </form>
    </>
  );
}
