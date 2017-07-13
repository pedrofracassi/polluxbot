const Discord = require("discord.js");
var paths = require("./paths.js");
var cfg = require('../config.js');
const main = require('../pollux.js')
var ff = require("./functionfest.js");
const Jimp = require("jimp");
const fs = require("fs");

//var emoji = require("../resources/lists/emoji.js");
//var playing = require("../resources/lists/playing.js");


Array.prototype.remove = function () {
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

module.exports = {


    //DB OPS


    paramAdd: function paramAdd(target, param, val) {

        try {

            if (target instanceof Discord.User) {

                var Umodules = main.userDB.get(target.id)
                if  (!Umodules.modules[param]){Umodules.modules[param] =[]}


                if (param.includes('.')) {
                    param = param.split('.')
                    Umodules.modules[param[0]][param[1]].push(val)
                } else {
                    Umodules.modules[param].push(val)
                }
                main.userDB.set(target.id, Umodules)

            }

            if (target instanceof Discord.Guild) {

                     var Smodules = main.DB.get(target.id)
            if (param.includes('.')) {
                param = param.split('.')
                   if (!Smodules.modules[param[0]][param[1]]){
                        Smodules.modules[param[0]][param[1]]=[]
                    }
                Smodules.modules[param[0]][param[1]].push(val)
            } else {
                  console.log("INCLUDES")
                Smodules.modules[param].push(val)
            }

            main.DB.set(target.id, Smodules)

            }
            if (target instanceof Discord.Channel) {

                var Tchannel = main.DB.get(target.guild.id)
                if  (!Tchannel.channels[target.id].modules[param]){Tchannel.channels[target.id].modules[param] =[]}

                if (param.includes('.')) {
                    param = param.split('.')
                    Tchannel.channels[target.id].modules[param[0]][param[1]].push(val)
                } else {
                    Tchannel.channels[target.id].modules[param].push(val)
                }
                main.DB.set(target.guild.id, Tchannel)

            }
            //  }
        } catch (err) {
            console.log('ERROR ONWRITE == PARAM ADD'.bgRed.white.bold)
            console.log(err.stack)


        }
    },
    paramRemove: function paramRemove(target, param, val) {
        try {

            //    param = param.split('.');
            //   if ((param.length == 1)) {

            if (target instanceof Discord.User) {

                var Umodules = main.userDB.get(target.id)
                if (param.includes('.')) {
                    param = param.split('.')
                    Umodules.modules[param[0]][param[1]].remove(val)
                } else {
                    Umodules.modules[param].remove(val)
                }
                main.userDB.set(target.id, Umodules)

            }

            if (target instanceof Discord.Guild) {

                var Smodules = main.DB.get(target.id)
                if (param.includes('.')) {
                    param = param.split('.')
                    Smodules.modules[param[0]][param[1]].remove(val)
                } else {
                    Smodules.modules[param].remove(val)
                }
                main.DB.set(target.id, Smodules)

            }
            if (target instanceof Discord.Channel) {

                var Tchannel = main.DB.get(target.guild.id)

                if (param.includes('.')) {
                    param = param.split('.')
                    Tchannel.channels[target.id].modules[param[0]][param[1]].remove(val)
                } else {
                    Tchannel.channels[target.id].modules[param].remove(val)
                }
                main.DB.set(target.guild.id, Tchannel)

            }
            //  }

        } catch (err) {
            console.log('ERROR JSON'.bgRed.white.bold)
            console.log(err.stack)
        }
    },
    paramIncrement: function paramIncrement(target, param, val) {
        try {



            if (target instanceof Discord.User) {

                var Umodules = main.userDB.get(target.id)
                 if  (!Umodules.modules[param]){Umodules.modules[param] =0}
                if (param.includes('.')) {
                    param = param.split('.')
                    Umodules.modules[param[0]][param[1]] += val
                } else {
                    Umodules.modules[param] += val
                }
                main.userDB.set(target.id, Umodules)

            }

            if (target instanceof Discord.Guild) {

                var Smodules = main.DB.get(target.id)
                if  (!Smodules.modules[param]){Smodules.modules[param] =0}
                if (param.includes('.')) {
                    param = param.split('.')
                    Smodules.modules[param[0]][param[1]] += val
                } else {
                    Smodules.modules[param] += val
                }
                main.DB.set(target.id, Smodules)

            }
            if (target instanceof Discord.Channel) {

                var Tchannel = main.DB.get(target.guild.id)
                if  (!Tchannel.channels[target.id].modules[param]){Tchannel.channels[target.id].modules[param] =0}

                if (param.includes('.')) {
                    param = param.split('.')
                    Tchannel.channels[target.id].modules[param[0]][param[1]] += val
                } else {
                    Tchannel.channels[target.id].modules[param] += val
                }
                main.DB.set(target.guild.id, Tchannel)

            }

        } catch (err) {
            console.log('ERROR JSON'.bgRed.white.bold)
            console.log(err.stack)
        }

    },
    paramDefine: function paramDefine(target, param, val) {
        try {

            if (target instanceof Discord.User) {

                var Umodules = main.userDB.get(target.id)

                if (param.includes('.')) {
                    param = param.split('.')
                    Umodules.modules[param[0]][param[1]] = val
                } else {
                    Umodules.modules[param] = val
                }

                main.userDB.set(target.id, Umodules)

            }

            if (target instanceof Discord.Guild) {

                var Smodules = main.DB.get(target.id)
                if (param.includes('.')) {
                    param = param.split('.')
                    Smodules.modules[param[0]][param[1]] = val
                } else {
                    Smodules.modules[param] = val
                }
                main.DB.set(target.id, Smodules)

            }
            if (target instanceof Discord.Channel) {

                var Tchannel = main.DB.get(target.guild.id)

                if (param.includes('.')) {
                    param = param.split('.')
                    Tchannel.channels[target.id].modules[param[0]][param[1]] = val
                } else {
                    Tchannel.channels[target.id].modules[param] = val
                }
                main.DB.set(target.guild.id, Tchannel)

            }
        } catch (err) {
            console.log('ERROR JSON'.bgRed.white.bold)
            console.log(err.stack)
        }
    },
    superDefine: function superDefine(target, param, val) {
        try {

            if (target instanceof Discord.User) {

                var Umodules = main.userDB.get(target.id)

                if (param.includes('.')) {
                    param = param.split('.')
                    Umodules[param[0]][param[1]] = val
                } else {
                    Umodules[param] = val
                }

                main.userDB.set(target.id, Umodules)

            }

            if (target instanceof Discord.Guild) {

                var Smodules = main.DB.get(target.id)
                if (param.includes('.')) {
                    param = param.split('.')
                    Smodules[param[0]][param[1]] = val
                } else {
                    Smodules[param] = val
                }
                main.DB.set(target.id, Smodules)

            }
            if (target instanceof Discord.Channel) {

                var Tchannel = main.DB.get(target.guild.id)

                if (param.includes('.')) {
                    param = param.split('.')
                    Tchannel.channels[target.id][param[0]][param[1]] = val
                } else {
                    Tchannel.channels[target.id][param] = val
                }
                main.DB.set(target.guild.id, Tchannel)

            }
        } catch (err) {
            console.log('ERROR JSON'.bgRed.white.bold)
            console.log(err.stack)
        }
    },
    checkGoods: function checkGoods(amount, invoker) {
        if (main.userDB.get(invoker.id).modules.goodies >= amount) {
            return true;
        } else {
            return false;
        }
    },



    //OLDS

    checkAdm: function checkAdm(origin, target) {
        try {

            let modRole = origin.guild.roles.find("name", "MOD");
            let admRole = origin.guild.roles.find("name", "ADM");
            let maidRole = origin.guild.roles.find("name", "🎀   Maids");

            if (origin.guild.member(target).roles.has(admRole.id)) {
                return "ADM";
            } else if (origin.guild.member(target).roles.has(modRole.id)) {
                return "MOD";
            } else if (origin.guild.member(target).roles.has(maidRole.id)) {
                return "MAID";
            } else if (target.bot) {
                return "BOT";
            } else {
                return "none";
            }
        } catch (err) {
            return "none"
        }
    },

    glassify: function glassify(img, call, msg = false) {

            Jimp.read(img).then(function (user) {

                Jimp.read(paths.BUILD + "glass.png").then(function (glass) {
                    Jimp.read(paths.BUILD + "note.png").then(function (lenna) {

                        user.resize(126, 126)
                        user.mask(glass, 0, 0)
                        var air = {}
                        Jimp.read(paths.BUILD + "note.png").then(function (lennaB) {
                            lennaB.composite(user, 0, 0)
                            lennaB.mask(lenna, 0, 0)

                            //lennaB.write(`${paths.GLASS}/${call}.png`);
                            console.log("Glassify Done")
                        });
                    });
                })
            });
        }

        ,

    shuffle: function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },
    clean: function clean(text) {
        if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    },
    draw: function draw(array, who) {
        var cardimg = Jimp.read(`${paths.BUILD}cards/fiver.png`).then(function (cardimg) {
            Jimp.read(`${paths.BUILD}cards/${array[0].card}.png`).then(function (c1) {
                cardimg.composite(c1, 0 * 96, 0)
                cardimg.write(`${paths.BUILD}cards/${who}0_bj.png`)
                console.log(array[0].card)
            })
            setTimeout(function () {
                Jimp.read(`${paths.BUILD}cards/${array[1].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 1 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}1_bj.png`)
                })
            }, 300);
            setTimeout(function () {
                Jimp.read(`${paths.BUILD}cards/${array[2].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 2 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}2_bj.png`)
                    console.log(array[2].card + "-------------------------------------")
                })
            }, 600);
            setTimeout(function () {
                console.log(`${paths.BUILD}cards/${array[3].card}.png`)
                Jimp.read(`${paths.BUILD}cards/${array[3].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 3 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}3_bj.png`)
                })
            }, 900);
            setTimeout(function () {
                Jimp.read(`${paths.BUILD}cards/${array[4].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 4 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}4_bj.png`)
                    cardimg.write(`${paths.BUILD}cards/${who}5_bj.png`)
                    console.log(array[5].card + "-------------------------------------")
                })
            }, 1200);
        })
    },
    drawalt: function drawalt(array, who) {

        if (array.length >= 1) {


            var cardimg = Jimp.read(`${paths.BUILD}cards/fiver.png`).then(function (cardimg) {


                Jimp.read(`${paths.BUILD}cards/${array[0].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 0 * 96, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}0_bj.png`)
                    console.log(array[0].card)
                })
            })
        };
        if (array.length >= 2) {
            setTimeout(function () {
                Jimp.read(`${paths.BUILD}cards/${array[1].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 1 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}1_bj.png`)
                })
            }, 50);
        }
        if (array.length >= 3) {
            setTimeout(function () {
                Jimp.read(`${paths.BUILD}cards/${array[2].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 2 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}2_bj.png`)
                    console.log(array[2].card + "-------------------------------------")
                })
            }, 100);
        }
        if (array.length >= 4) {
            setTimeout(function () {
                console.log(`${paths.BUILD}cards/${array[3].card}.png`)
                Jimp.read(`${paths.BUILD}cards/${array[3].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 3 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}3_bj.png`)
                })
            }, 150);
        }
        if (array.length >= 5) {
            setTimeout(function () {
                Jimp.read(`${paths.BUILD}cards/${array[4].card}.png`).then(function (c1) {
                    cardimg.composite(c1, 4 * 97, 0)
                    cardimg.write(`${paths.BUILD}cards/${who}4_bj.png`)
                    cardimg.write(`${paths.BUILD}cards/${who}5_bj.png`)
                    console.log(array[5].card + "-------------------------------------")
                })
            }, 200);
        }
    },
    getDir: function getDir(rootDir, cb) {
        fs.readdir(rootDir, function (err, files) {
            var dirs = [];
            for (var index = 0; index < files.length; ++index) {
                var file = files[index];
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
                        index: index,
                        file: file
                    }));
                }
            }
        });
    }

}
