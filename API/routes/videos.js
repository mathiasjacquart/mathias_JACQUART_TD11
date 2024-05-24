const express = require("express");
const { insertVideo, getAllVideo } = require("../controllers/video-controller");

const router = express.Router();

router.post("/", insertVideo);
router.get("/", getAllVideo);

module.exports = router;
