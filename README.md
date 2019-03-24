# News Scraper
This site gathers information on the top stories on Vox.com, including the headline, a summary of the story, and a link to the site, and displays them. It also allows them to leave comments on these stories. The site is very helpful for people who want to see top news stories gathered in one place, to comment on these stories, and to read the comments of others.

## How to run the site on local machine
The repository can be cloned by clicking the Clone or Download button on the main repository page, then clicking the button next to the url which appears below. Then open a Terminal or Git Bash window, navigate to the location where you want to place the cloned repository, then type 'git clone' and then paste the repository that was just copied. The node packages that are necessary to run the site can be installed by navigating into the main directory and entering 'npm install.' The site can then be started by entering 'node server.js' in the terminal while still in the main directory. Running this command will also create a local MongoDB database called 'mongoHeadlines' as well as scrape any new data from the Vox homepage and store it in this database. The site can then be opened in a web browser by typing 'localhost:3000' into the address bar. 

## Repository Organization
The main directory contains the 'package.json' and 'server.js' files. Also in the main directory are two subfolders - 'models' and 'views.' 'models' contains 'Article.js' which had code for creating a model for the Vox articles and then exports that model. Also in this folder is 'Comment.js', which likewise has code for creating a model for comments left on the articles. 'index.js' exports both of the models for use in the 'server.js' file. 
The 'views' folder contains code for using 'Express-Handlebars' to create HTML elements and display them on the page. In this folder, 'index.js' contains code which determines how all information on news articles and comments retrieved from the database are displayed. It also contains CSS code within style tags which determine how the elements are styled. Within the script tags is the client-side code for posting comments to the database, which is triggered clicks the 'Add Comment' button and for deleting comments, which is triggered when the user clicks the 'Delete Comment' button on any comment. The 'partials' subfolder within the 'views' folder contains comments.handlebars, which determines how each comment retrieved from the database is displayed on the page. Within the 'layouts' subfolder in the 'views' folder is 'main.handlebars', which contains code for the html title and body on the page, as well as links to the CSS Bootstrap and jQuery cdns. 
In the main directory, the 'server.js' file contains code for creating the 'mongoHeadlines' database, scraping information from the Vox homepage, creating a document for each article in the Articles model, and displaying this information on the homepage. It also contains the server-side code for posting comments to database, displaying these comments, and deleting these comments from the database. 

## How to use the site
The user can scroll through the page and see the headline and a summary for each top story. Clicking on the headline will also open the article in a new tab. Users can see comments left by other users on each article and leave their own comment by entering a username and comment in the labled text boxes and clicking the 'Add Comment' button. This comment will then be displayed under the news article each time the page is loaded. 

## Technology used
* HTML
* CSS
* CSS Bootstrap
* JavaScript
* jQuery
* MongoDB
* Node.js
* node packages:
    * axios
    * cheerio
    * express
    * mongoose
    * morgan
    * express-handlebars
 
 ## Future Improvements
There is code in index.handlebars to reload the page after a comment is posted or deleted, but it is not functioning as intended. Modifications could be made to the code to fix this issue. 
 
 ## Link to deployed page
 < a href="https://radiant-ravine-53892.herokuapp.com/">Vox News Scraper</a>
