const Discord = require('discord.js');
const request = require('request');
const config = require("../config.json");
const mysql = require('mysql');
var users = new Array();;


module.exports.run = async (bot, message, args, con) => {
  //this is where the actual code for the command goes
  await message.delete()

  var con = mysql.createConnection({
    host: "localhost",
    user: config.dbUser,
    password: config.dbPassword,
    database : "iptv"
  });
allesOphalen(bot);

//   con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM users", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);

//       result.forEach(x => {
//           console.log(x.username);
//       })
//     });
//   });




}

async function allesOphalen(bot){
    var url = 'https://api.bestbuyiptv.store/v1/line/list?limit=64'
    var headers = 
    {
         'Authorization':'Bearer' + config.apiKey
    }
    var options = {
        'method': 'GET',
        url,
        'headers': {
          'Authorization': 'Bearer nx1Iq4wDIE39F0bwiE2pmN0-EHHy7giq',
          'Content-Type': 'application/x-www-form-urlencoded',
          'limit': '1000'
        }
      };

    request(options, callback);    
    async function callback(error, response) {
        if (!error && response.statusCode == 200) {
            var result = await JSON.parse(response.body).result
            var data = await result.data
            var sql = "INSERT INTO users(username, password, expiredAt, lineId) VALUES "
            for (var i = 0; i < data.length; i++){
                //sql += "('" + data[i].username + "','"+data[i].password+"',FROM_UNIXTIME("+ data[i].expired_at + ")),";
                sql += `("${data[i].username}", "${data[i].password}", FROM_UNIXTIME(${data[i].expired_at}), "${data[i].id}" ),`;

            } 
            console.log(sql);


        } else {
        bot.channels.get(config.logChannelId).send("Fout bij API call...")

        }
      }

}

//name this whatever the command name is.
module.exports.help = {
  name: "db",
  description: "Database"

}
