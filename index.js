

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




app.listen(port, function(err){
    if(err){
        console.log("error in running server");
    }
    console.log("server is running");
});