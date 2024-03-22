var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var db = require("./models");
var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("/public"));

app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/", function (req, res) {

    axios.get("https://www.vox.com/").then(function(response) {

        var $ = cheerio.load(response.data);

        $(".c-entry-box--compact").each(function (i, element) {

            var entry = {};
            entry.title = $(element).find("h2").text();
            entry.summary = $(element).find(".p-dek").text();
            entry.link = $(element).find("a").attr("href");

            if (((entry.summary) !== "") && ((entry.summary) !== null)) {

                db.Article.create(entry)
                    
                    .catch(function (err) {
                        console.log(err);
                    })

            };   

        });

    }).then(function() {
        db.Article.find({})
        .lean()
        .populate("comment")
        .then(function(results){
            let articles = results.reverse();
            res.render("index", {
                articles: articles
            });
        })
        .catch(function(err){
            console.log(err);
        })
    })
});

app.delete("/comment/:id", function(req, res){

    db.Comment.findByIdAndDelete(req.params.id)
    .then(function(){
        console.log("Comment deleted");
    })
});

app.post("/articles/:id", function (req, res) {

    db.Comment.create(req.body)
        .then(function (stuff) {
            return db.Article.update({ _id: req.params.id }, 
                { 
                    $push: { comment: {
                    $each: [stuff],
                    $position: 0
            }}})
        });

})

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });