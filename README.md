# web-scraping-NodeJS

Postman Colection Link-> https://www.getpostman.com/collections/5bcb6cd201efa32c6df4

-> Packages used cheerio, express,  node, nodemon, request, request-promise

-> Created index.js to write server logics.

-> n running the server it will open file index.html

-> Created form in file index.html with fields pageName and submit button. 

-> Method of form is POST request .

-> On submitting it redirects to "/parse"

->  "/parse" routes catches input from the form and returns the title, description, images, all Meta og parameters after scraping.
