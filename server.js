var axios = require("axios");
var cheerio = require("cheerio");

axios.get("https://www.vox.com/").then(function(response){

var $ = cheerio.load(response.data);

var articles = [];

$(".c-entry-box--compact").each(function(i, element){
    
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

        articles.push(entry);

    }

});

console.log(articles);

})