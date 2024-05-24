const API_URL = "http://localhost:4254/api/videos";

export const getAllVideos = async () => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const videosFromApi = await response.json();
      return videosFromApi;
    }
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    throw error;
  }
};

export const addVideo = async (videoUrl, title) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ video: videoUrl, titre: title})
    });

    if (response.ok) {
      const newVideo = await response.json();
      return newVideo;
    }
  } catch (error) {
    console.error("Failed to add video:", error);
    throw error;
  }
};
