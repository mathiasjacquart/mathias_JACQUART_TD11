const { insertVideo, getAllVideo } = require("../controllers/video-controller");

const router = require("express").Router


router.post("/videos", insertVideo)
router.get("/videos", getAllVideo)

module.exports = router;