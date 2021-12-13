 

const express = require('express');
const path = require('path');
const { nextTick } = require('process');
const port = process.env.PORT ||  8000;

const app = express();

 

const request = require("request-promise");

const cheerio = require("cheerio");

const fs = require("fs");

const json2csv = require("json2csv").Parser;
const { next } = require('cheerio/lib/api/traversing');



app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));

//sending index.html file
app.get('/', function(req,res){
    try{
        res.sendFile(__dirname + '/index.html');
    }catch(e){
        res.send(e);
    }
})


//after submitting form this is rendered
app.post('/parse', async function(req,res){
    try{
        const pageName = req.body.pageName;
        let resultArr = []


        const response = await request({
            uri: pageName,         //uri object where we want to make a request
            gzip:true,
        });


        const $ = cheerio.load(response)

        const title =  $('title').text()


        //list of images
        let img = [];
         $("img").each((index, image)=>{
            let val = $(image).attr('src');
            img.push(val);
        });

    
        const description =  $('meta[name="description"]').attr('content');
        
        let allOGList = [];

        //to read all the og meta data
        $("meta[property^='og']").each((index, listOfOg)=>{
    
            let val = $(listOfOg).attr('content');
    
            allOGList.push(val);
            
        });
    
        resultArr.push({
            title,
            description,
            img,
            allOGList
            
        });
        
        return res.send(resultArr);
    }catch(err){
        res.send(err);
    }

});

app.listen(port, function(err){
    if(err){
        console.log("error in running server");
    }
    console.log("server is running");
});
