const obj = { // default values that wont be changed
    "configVersion":2,
    "info":"Map auto-generated with Entrailism",
    "tags":[],
    "levelResources":[],
    "handCount":1,
    "moreInfoURL":"",
    "speed": 15.0,
    "lives":50,
    "maxLives":50,
    "musicFile":"music.ogg",
    "iconFile":"icon.png",
    "environmentType":-1,
    "unlockConditions":[],
    "hidden":false,
    "checkpoints":[],
    "e":""
}

function makeConfig(name,events,duration){
    let newObj = JSON.parse(JSON.stringify(obj)); // clone the values cus im lazy
    newObj.name = name;
    newObj.events = events;
    newObj.musicTime = duration;
    return newObj;
}

let arcs = ["Down","Up","Left","Right","Down-Up","Left-Right","Down-Right","Down-Left","Up-Right","Up-Left"];

module.exports = function(tmp,data,name,bpm,isRandom){
    var t = (tmp.duration/tmp.wav._adapter._data.length);

    let events = [];
    let cache = null;
    for(var i = 0; i<data.length; i++){
        if(data[i]==true){
            if(((i*t)-cache)<bpm){
                continue;
            }
            cache = i*t
            let dat = (isRandom) ? arcs[Math.floor(Math.random()*arcs.length)] : arcs[((data.length+i)%(arcs.length))];
            let e = {
                time: cache,
                data: [
                    "SpawnObj",
                    `[${dat}],0`
                ]
            }
            events.push(e);
        }
    }

    return makeConfig(name,events,tmp.duration);
}