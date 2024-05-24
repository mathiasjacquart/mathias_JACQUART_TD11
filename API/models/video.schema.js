const mongoose = require("mongoose");
// const User = require("./user.schema")

const videoSchema = new mongoose.Schema( 
    {
        videoUrl : {
            type:String,
            required:true
        },
        title: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("videos" , videoSchema)
