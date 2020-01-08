const Discord = require('discord.js')
const giveaways = require("discord.js-giveaway")
const config = require("../config.json")


module.exports.run = async (bot, message, args) => {

    if (!message.member.roles.has(config.devID)){
        return message.reply("Don't try me bru").then(m => m.delete(10000))
    }
    if (args[0] == undefined){
        return message.reply("Geef mij prijs bru").then(m => m.delete(10000))
    }

    giveaways.start(message.channel, {
        time: args[1],
        prize: args[0],
        winnersCount: parseInt(args[2])
    }).then((gData) => {
        console.log(gData); // {...} (messageid, end date and more)
    });



}
//name this whatever the command name is.
module.exports.help = {
    name: "giveaway"
}