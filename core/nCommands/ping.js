var cmd = 'ping';
var init = function (message) {



    var start = Date.now();
    message.channel.sendMessage("pong").then(sendedMessage => {
        var stop = Date.now();
        var diff = (stop - start);
        sendedMessage.edit(`pong \`${diff}ms\``);



    });
};
module.exports = {cmd: cmd, perms: 0, init: init, cat: 'misc'};
