#!/usr/bin/env node
"use strict"

const fs = require("fs");

if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
}

const { argv } = require('yargs');

if (argv.name && argv.music && argv.bpm) {
    let foldername = require("crypto").randomBytes(4).toString("hex");
    console.log('Creating map directory in\n     output/'+foldername);
    begin(foldername,argv);
} else {
    console.log("Name, Music, and BPM are required");
    process.exit();
}

function begin(foldername,arg){
    fs.mkdirSync("output/"+foldername);
    fs.copyFileSync("defaults/icon.png","output/"+foldername+"/icon.png");
    fs.mkdirSync("output/"+foldername+"/Localization");
    fs.copyFileSync("defaults/localization_test.csv","output/"+foldername+"/Localization/localization_test.csv");

    require("./audio.js")(arg.music,foldername,function(tmp,response){
        let difficulty; 
        if(arg.difficulty=="hard"){
            difficulty = 2
        }else if(arg.difficulty=="harder"){
            difficulty = 4
        }else{
            difficulty = 1
        }
        let bpm = (60/parseInt(arg.bpm))/difficulty
        let isRandom = (arg.random=="true") ? true : false
        let configtxt = require("./construct.js")(tmp,response,arg.name,bpm,isRandom);
        fs.writeFileSync("output/"+foldername+"/config.txt", JSON.stringify(configtxt));
        console.log("\nDone!");
    }, (parseInt(arg.threshold)||110));
}