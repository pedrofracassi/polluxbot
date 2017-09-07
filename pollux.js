//Discord Start
const gear = require("./core/gearbox.js");
const rq = require("request");
const bot = new gear.Discord.Client({
    messageCacheMaxSize: 4048,
    messageCacheLifetime: 1680,
    messageSweepInterval: 2600,
    disableEveryone: true,
    fetchAllMembers: true,
    disabledEvents: ['typingStart', 'typingStop', 'guildMemberSpeaking']
});



// Get Tokens
const cfg = require('./config.js');




//======================================//
//      GENERATE RARITY LIBS
//======================================//







//=======================================//
//      TOOLSET
//======================================//

const deployer = require('./core/deployer.js'); // <------------- I DUN LIKE DIS << FIX
//==-------------------------------------------
// UTILITY

const fs = require("fs");
const paths = require("./core/paths.js");
const emojya = bot.emojis.get('343314186765336576');
//var cleverbot = require("cleverbot"); // <------------- REVIEW  DIS << NEEDS $ for CB fee
//cleverbot = new cleverbot(cfg.clever.ID, cfg.clever.token);
const async = require('async');
let timer;
const {
    AkairoClient
} = require('discord-akairo');
const client = new AkairoClient({
    ownerID: '88120564400553984',
    prefix: '+'
});
const skynet = '248285312353173505';
const colors = require('colors');
//==-------------------------------------------


//==-------------------------------------------
// MULTILANG

const i18next = require('i18next');
const multilang = require('./utils/multilang_b');
const Backend = require('i18next-node-fs-backend');
const backendOptions = {
    loadPath: './utils/lang/{{lng}}/{{ns}}.json',
    addPath: './utils/lang/{{lng}}/{{ns}}.missing.json',
    jsonIndent: 2
};



getDirs('utils/lang/', (list) => {
    i18next.use(Backend).init({
        backend: backendOptions,
        lng: 'en',
               fallbackLng: true,
        fallbackLng: "en",
        preload: list,
        load: 'all'
    }, async (err, t) => {
        if (err) {
            console.log(err)
        }

        await multilang.setT(t);
    });
})

const mm = multilang.getT();

//Gearbox assemble!


//Database load!
const DB = gear.DB
const userDB = gear.userDB
const defaults = require("./utils/defaults.js")  // Database Defaults

//DASHBOARD INIT
const dash = require("./dash/server.js")
dash.init(bot,DB,userDB)



//==-------------------------------------------

async function loginSuccess() {

    console.log('LOGGED IN!'.bgGreen.white.bold)

    let name = 'Pollux Core Reporter';
    let tx = `Successful Login!`;
    let color = '#49c7ff';

   // gear.sendSlack(name, tx, undefined, color)

// ACTIONS OVER TIME ▼▼▼▼▼▼▼▼▼▼

    setInterval(function () {
        var date = new Date();

        if (date.getHours() === 3){

            let epc = date.getTime()
                gear.superDefine(bot.user,"epochStamp",date)
            if (!userDB.get(bot.user.id).dailyEpoch){
                gear.superDefine(bot.user,"dailyEpoch",epc)
            }

            var botEntry = userDB.get(bot.user.id)
            try{
            botEntry.dailyEpoch = epc
            }catch(e){
            botEntry.dailyEpoch= epc
            }
            if (isNaN(botEntry.dailyEpoch)){
            botEntry.dailyEpoch= epc
            }

            userDB.set(bot.user.id,botEntry)

        }
        if (date.getSeconds() === 0) {

            gear.gamechange(bot)

        }
    }, 1000); // EVERY SEC

    setInterval(function () {
        //CLEAR EV CACHE
        fs.readdir("./eventHandlers/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
      delete require.cache[require.resolve(`./eventHandlers/${file}`)]
  });
            postGCount(bot.guilds.size);
});

  }, (60000*15) ); // EVERY 15 MINS

// ACTIONS OVER TIME ▲▲▲▲▲▲▲▲▲
}

console.log('Ready to Rock!')


//=====================================

Array.prototype.removeire = function removeire() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


//=======================================//
//      FUNCTIONFEST
//=======================================//

function getDirs(rootDir, cb) {
    fs.readdir(rootDir, function (err, files) {
        var dirs = [];
        for (var i = 0; i < files.length; ++i) {
            var file = files[i];
            if (file[0] !== '.') {
                var filePath = rootDir + '/' + file;
                fs.stat(filePath, function (err, stat) {
                    if (stat.isDirectory()) {
                        dirs.push(this.file);
                    }
                    if (files.length === (this.index + 1)) {
                        return cb(dirs);
                    }
                }.bind({
                    index: i,
                    file: file
                }));
            }
        }
    })
} //detatch


function commandFire(message, Server, Channel, Author) {


    message.botUser = bot;
    message.akairo = client;


    if(!message.prefix) message.prefix = DB.get(Server.id).modules.PREFIX;
    let forbiddens = DB.get(Server.id).channels[Channel.id].modules.DISABLED

    let DTMN = deployer.determine(message)
    let MDLE = deployer.checkModule(DTMN);

    if (!DTMN) return;
    if (DTMN.reaction) {
        if (forbiddens.includes(MDLE)) return;
        if (deployer.checkUse(DTMN, DB, message)!==true) return;
        return message.channel.send({files: [DTMN.reaction]});
    };
    try {

      if (forbiddens.includes(MDLE)) {
        return message.reply("forbidden")
      }
    } catch (e) {

    }
    var mm = multilang.getT();
    switch (deployer.checkUse(DTMN, DB, message)) {
        case "DISABLED":
            message.reply(mm('CMD.disabledModule', {
                lngs: message.lang,
                module: message.content.substr(message.prefix.length).split(' ')[0]
            }))
            break;
        case "NO ELEVATION":
            message.reply(mm('CMD.insuperms', {
                lngs: message.lang,
                prefix: message.prefix
            }))
            break;
        default:
            deployer.run(DTMN.path, message, userDB, DB); //aqui nóis vai!
            break;
    }
}

function DMcommandFire(message) {

    message.botUser = bot;
    message.akairo = client;


    if(!message.prefix) message.prefix = "+"

    let DTMN = deployer.determine(message)
  //  let MDLE = deployer.checkModule(DTMN);

    if (!DTMN) return;
    if (DTMN.reaction) {
      //  if (forbiddens.includes(MDLE)) return;
      //  if (deployer.checkUse(DTMN, DB, message)!==true) return;
      //  return message.channel.send({files: [DTMN.reaction]});
    };



            deployer.run(DTMN.path, message, userDB); //aqui nóis vai!

}


bot.login(cfg.token).then(loginSuccess());


//=======================================//
//      BOT EVENT HANDLER
//=======================================//

fs.readdir("./eventHandlers/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventor = require(`./eventHandlers/${file}`);
    let eventide = file.split(".")[0];

    bot.on(eventide, (...args) => eventor.run(gear,DB,userDB,bot, ...args));
  });
});

//=======================================//
//      PROCESS EVENT HANDLER
//=======================================//

process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise \n".red,p, "\n\n reason: ".red, reason.stack);

   // gear.sendSlack("Promise Breaker","Promise Rejection: "+reason,reason.stack,"#ffcd25" )
});
process.on('uncaughtException', function (err) {

    console.log('EXCEPTION: '.bgRed.white.bold + err);
    console.log(err.stack);

    let name = 'Pollux Core Reporter'
    let txb = '__**System has Sustained a Crash Event**__'
    let tx = `

**${err}**
${err.stack}
`
    let color = '#C04'

   // gear.sendSlack(name, txb, tx, color)





});

function postGCount(g) {
    let rqORG = {
        headers: {
            Authorization: cfg.dborg
        },
        url: `https://discordbots.org/api/bots/271394014358405121/stats`,
        method: 'POST',
        body: {
            server_count: g
        },
        json: true
    };
    rq(rqORG, function (err, response, body) {
        if (err) {
            console.log("ORG");
            console.log(err)
        }
        console.log("ORG");
        //  console.log(response);
        console.log(body);
    });

    let rqOptions = {
        headers: {
            Authorization: cfg.pwTok
        },
        url: `https://bots.discord.pw/api/bots/271394014358405121/stats`,
        method: 'POST',
        body: {
            server_count: g
        },
        json: true
    };

    rq(rqOptions, function (err, response, body) {
        if (err) {
            console.log("PW");
            console.log(err)
        }
        console.log("PW");
        //  console.log(response);
        console.log(body);
    });

    /*
        });
        let rqCarbon = {
            url: `https://www.carbonitex.net/discord/data/botdata.php`,
            method: 'POST',
            json: {
                "server_count": g,
                "key": cfg.carbon_token //SOON
            }
        };
        rq(rqCarbon, function (err, response, body) {
            if (err) {
                console.log(err)
            }
        });
    */

}

//---------------------------------------------------------------------------------------- END

module.exports = {
    userDB: userDB,
    DB: DB,
    commandFire: commandFire,
    DMcommandFire: DMcommandFire,
    postGCount: postGCount,
    bot:bot
};
