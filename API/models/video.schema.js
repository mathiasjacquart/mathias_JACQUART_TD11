const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema( 
    {
        videoUrl : {
            type:String,
            required:true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = videoSchema;