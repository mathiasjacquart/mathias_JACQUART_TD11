// const mongoose = require("mongoose");
const Videos = require("../models/video.schema")

const calculateTimeDifference = (createdAt) => {
  const currentTime = new Date();
  const createdAtTime = new Date(createdAt);
  const differenceInSeconds = Math.floor((currentTime - createdAtTime) / 1000);

  if (differenceInSeconds < 60) {
      return `Il y a ${differenceInSeconds} secondes`;
  } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `Il y a ${minutes} minute(s)`;
  } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `Il y a ${hours} heure(s)`;
  } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `Il y a ${days} jour(s)`;
  }
};
const insertVideo = async (req, res) => {
  console.log(req.body);
    try {
        
        // console.log(userID);
        const video = await Videos.create({ 
            videoUrl: req.body.video,
            title: req.body.titre,
            // username: user.username,
            // user: req.body.user

        });
        video.timeAgo = calculateTimeDifference(video.createdAt);

    res.status(200).json(video);
        
    } catch (error) {
        res.status(400).json ({error: error.message})
    }
};

const getAllVideo = async (req, res) => {
    console.log(req.body);
    try {
      const allVideo = await Videos
      .find({})
      // .populate('user, username');
      console.log(allVideo)
      res.status(200).json(allVideo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



module.exports = { insertVideo, getAllVideo}