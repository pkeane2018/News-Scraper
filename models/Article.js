var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true,
      unique: true
    },
    summary : {
      type: String,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "comment"
    }
  });

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
