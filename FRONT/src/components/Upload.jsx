import { useEffect, useState } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../firebase";

export default function Upload() {
  const [video, setVideo] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [videoProgress, setVideoProgress] = useState(0);
  const [allVideo, setAllVideo] = useState([]);

  useEffect(() => {
    video && uploadFile(video);
  }, [video]);

  useEffect(() => {
    async function getVideos() {
      try {
        const response = await fetch("http://localhost:4254/api/videos");
        if (response.ok) {
          const videosFromApi = await response.json();
          // console.log(videosFromApi);
          setAllVideo(videosFromApi);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getVideos();
  }, []);

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "videos/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setVideoProgress(Math.round(progress));
      },
      (error) => {
        console.log(error);
        // switch (error.code) {
        //   case "storage/unauthorized":
        //     console.log(error);
        //     break;
        // }
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
      const response = await fetch("http://localhost:4254/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video: videoLink }),
      });

      if (response.ok) {
        const newVideo = await response.json();
        console.log(newVideo);
        setAllVideo([...allVideo, newVideo]);
        setVideo(null);
        setVideoLink("");
        setVideoProgress(0);
        const input = document.getElementById("video");
        input.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
          <form onSubmit={handleSubmit} className="mb-20">
        <div className="d-flex flex-column mb-20">
          <label htmlFor="video" className="mb-10">
            Video :
          </label>
          {videoProgress > 0 ? "Uploading: " + videoProgress + "%" : ""}
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={(e) => setVideo(() => e.target.files[0])}
          />
        </div>
        <button className="btn btn-primary">Upload</button>
      </form>
      <div
        className="d-flex flex-row flew-wrap"
        style={{
          minWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {allVideo &&
          allVideo.map((video) => (
            <video
              key={video._id}
              src={video.videoUrl}
              alt="video"
              style={{
                width: "300px",
                maxHeight: "300px",
                marginRight: "20px",
              }}
            />
          ))}
      </div>
    </>

  );
}
