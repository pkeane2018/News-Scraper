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

app.get("/hello", function (req, res) {

    console.log("Hoochy Mama!");

    axios.get("https://www.vox.com/").then(function(response) {

        var $ = cheerio.load(response.data);

        $(".c-entry-box--compact").each(function (i, element) {

            var entry = {};
            // var entry = $(this).html();
            entry.title = $(element).find("h2").text();
            entry.summary = $(element).find(".p-dek").text();
            entry.link = $(element).find("a").attr("href");
            // .find("div.c-entry-box--compact_body").html();
            // .find("a").text().;
            // .find($(".c-entry-box--compact_title")).html();
            // .find(".c-entry-box--compact_body").children().html();
            // .find("h2.c-entry-box--compact_title")

            if (((entry.summary) !== "") && ((entry.summary) !== null)) {

                console.log(entry);

                db.Article.create(entry)
                    
                    .catch(function (err) {
                        console.log(err);
                    })

            };   

        });

    }).then(function() {
        db.Article.find({}).then(function(results){
            res.render("index", {
                articles: results
            });
        })
        .catch(function(err){
            console.log(err);
        })
    })
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });