const mongoose = require("mongoose");
const videoSchema = require("../models/video.schema")
const Videos = mongoose.model("videos" , videoSchema)

const insertVideo = async (req, res) => { 
    console.log(req.body);

    try {
        const video = await Videos.create({ 
            videoUrl: req.body.video
        });
    res.status(200).json(video);
        
    } catch (error) {
        res.status(400).json ({error: error.message})
    }
};

const getAllVideo = async (req, res) => {
    console.log(req.body);
    try {
      const allVideo = await Videos.find({});
      res.status(200).json(allVideo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



module.exports = { insertVideo, getAllVideo}