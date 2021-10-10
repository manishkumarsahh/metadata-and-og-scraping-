const request = require("request-promise");

const cheerio = require("cheerio");

const fs = require("fs");

const json2csv = require("json2csv").Parser;

const movie = "https://www.imdb.com/title/tt0242519/";

(async() => {

        let imdbData = []
        const response = await request({
            uri: movie,         //uri object where we want to make a request
            headers: {           
                accept:
                 "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9"
            },        
            gzip:true,
        });


        const $ = cheerio.load(response)

        const title =  $('h1[class="TitleHeader__TitleText-sc-1wu6n3d-0 dxSWFG"]').text()
 

        const rating = $('span[class="AggregateRatingButton__RatingScore-sc-1ll29m0-1 iTLWoV"]').text();

        imdbData.push({
            title,
            rating
        });

        const j2cp = new json2csv();
        const csv = j2cp.parse(imdbData);// to parse the imdb data

        fs.writeFileSync("./imdb.csv", csv, "utf-8");   //path,name, type

         console.log(csv);


})();