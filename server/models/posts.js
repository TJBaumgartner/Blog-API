const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchehma = new Schema({
    title: {type: String, required: true},
    post: {type: String, required: true},
    isPublished: {type: Boolean, default: false},
    poster: [{ type: Schema.Types.ObjectId, ref: "User" }],
},
{timestamps: true}
);

PostSchehma.virtual("url").get(function () {
    return `/posts/${this.id}`;
});

module.exports = mongoose.model("Post", PostSchehma);