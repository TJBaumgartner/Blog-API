const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {type: String, required: true},
    forPost: [{type: Schema.Types.ObjectId, ref: "Post"}],
    poster: [{ type: Schema.Types.ObjectId, ref: "User" }],
},
{timestamps: true}
);

CommentSchema.virtual("url").get(function () {
    return `/comments/${this.id}`;
});

module.exports = mongoose.model("Comment", CommentSchema);