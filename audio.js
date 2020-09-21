var sox = require('sox.js');
var fs = require("fs");

const WaveformData = require('waveform-data');
const { exec } = require("child_process");
const mm = require('music-metadata');

let soxpath = fs.readFileSync("sox.txt");

module.exports = function (music, foldername, callback) {
    sox({
        soxPath: soxpath.toString(),
        inputFile: music,
        outputFile: 'output/' + foldername + '/music.ogg'
    });

    exec("audiowaveform -i " + music + " -o output/" + foldername + "/track.json -b 8 -z 256", (error, stdout, stderr) => {
        construct(music,foldername,callback);
    });
}

function construct(music, foldername, callback) {
    let tmp = {};
    let json = JSON.parse(fs.readFileSync("output/" + foldername + "/track.json").toString());
    let wav = WaveformData.create(json);
    tmp.wav=wav;
    mm.parseFile(music)
        .then(metadata => {
            tmp.duration=metadata.format.duration;
            readWaves(tmp,callback);
        })
        .catch(err => {
            console.error(err.message);
        });
}

function readWaves(tmp,callback){
    const channel = tmp.wav.channel(0);
    let isPeaked = [];
    for (let x = 0; x < tmp.wav.length; x++) {
        const val = channel.max_sample(x);
        isPeaked.push(val>120);
    }
    callback(tmp,isPeaked);
}