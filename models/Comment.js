var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    username: {
        type: String,
        default: "anonymous"},
    body: {
        type: String,
        requied: true
    },
    timeSubmitted: {
        type: Date, 
        default: Date.now 
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;