const express = require('express')
const app = express()
const Trello = require('trello-node-api')(process.env.apiKey, process.env.oauthToken);
const roblox = require('noblox.js');

app.get('/', function (req, res) {
  res.send('The bot is online')
})
 let port = process.env.PORT || 3000;
app.listen(port)
 
require('dotenv').config()

/////////////////////// DISCORD //////////////////////////////

const Discord = require("discord.js");
const  client = new Discord.Client();

function presence(){
client.user.setPresence({
   status:"online",
   activity: { 
     name: "Over You, Founder of The City of Ottawa" ,
     type: "WATCHING"
   }
})
}  
client.on("ready", () => {
   console.log("What's Up Dog");
   presence();
});

//client on
let prefix = process.env.prefix

 client.on("message", async message =>{
   if(message.author.bot) return;
   if (!message.content.startsWith(prefix)) return;
 
 //commands
   const args = message.content.slice(prefix.length).trim().split(/ +/g);
   const command = args.shift().toLowerCase(); 
    const sugchannel = client.channels.cache.get('744696683878940763');
    const sayperms = message.member.roles.cache.get("744691012013785148") || message.member.roles.cache.get("744692779233574932") || message.author.id === "344215641042976778";

    //embed//
  if(command === 'suggest'){
    {
   let Suggestion = args.slice(0).join(" ");
  if(!Suggestion) return message.channel.send("You need to type your suggestion")

message.delete();
message.channel.send("✅ Your Suggestion has been successfully sent")

   const sugembed = new Discord.MessageEmbed()
     .setTitle('**Suggested By **' + message.author.tag)
     .setColor("BLUE")
     .setDescription(Suggestion)
     .setFooter("City of Ottawa | Bot")
     .setTimestamp()
       
sugchannel.send(sugembed).then(sentEmbed => {
    sentEmbed.react("👍");
    sentEmbed.react("👎");
      
const embed2 = new Discord.MessageEmbed()
.setTitle("**Suggestion Log System**")
.setColor("BLUE")
.addFields(
		{ name: '**Suggestion By:**', value: ("<@" + message.author.id + "> " + message.author.tag) },
 { name: '**Suggestion:**', value: (Suggestion) },
 { name: '**Time:**', value: (message.createdAt) },
)
})
 }
 }

if(command === 'say'){
    if(sayperms)
{
 const embed2 = new Discord.MessageEmbed()
    .setColor("BLUE")
     .setDescription("What's the title of this announcement?")
     .setFooter("This command will automatically be cancelled in 10 minutes.")

message.channel.send(embed2)

let Author = message.author;
let Authorid = Author.id; 

const filter1 = response1 => {
return response1.author.id === Authorid;
}

message.channel.awaitMessages(filter1, { max: 1, time: 600000, errors: ['time'] })
.then(collected1 => {
const response1 = collected1.first();
const embed1 = new Discord.MessageEmbed()
    .setColor("BLUE")
     .setDescription("What's the description of this announcement?")
     .setFooter("This command will automatically be cancelled in 10 minutes.")

message.channel.send(embed1)

const filter2 = response2 => {
return response2.author.id === Authorid;
}

message.channel.awaitMessages(filter2, { max: 1, time: 600000, errors: ['time'] })
.then(collected2 => {
const response2 = collected2.first();
const embed1 = new Discord.MessageEmbed()
    .setColor("BLUE")
     .setDescription("What's the Id of the channel? if you want to announce in this channel just put N/A. If you don't receive other message then the bot couldn't find the channel")
     .setFooter("This command will automatically be cancelled in 10 minutes.\n")

message.channel.send(embed1)

const filter3 = response3 => {
return response3.author.id === Authorid;
}

message.channel.awaitMessages(filter3, { max: 1, time: 600000 })
.then(collected3 => {
const response3 = collected3.first();
const nrep = response3.content === "N/A"
   const embed = new Discord.MessageEmbed()
     .setTitle(response1.content)
     .setColor("BLUE")
     .setDescription(response2.content)
     .setThumbnail('https://cdn.discordapp.com/attachments/752674504291123261/776102174080892948/City_of_ottawa.png')
     .setFooter("City of Ottawa | Main Bot ")
     .setTimestamp()

 if(nrep) {
   message.channel.send(embed)
 } 
 else if(!nrep) {
const lchannel = client.channels.cache.get(response3.content);
lchannel.send(embed)

const embed1 = new Discord.MessageEmbed()
     .setColor("BLUE")
     .setDescription("✅ Your announcement has been successfully sent")
     message.channel.send(embed1)
 }
 }).catch(collected1 => {
message.channel.send("Operation Cancelled")
		});
 }).catch(collected2 => {
     message.channel.send("Operation Cancelled")
		});
 }).catch(collected3 => {
message.channel.send("Operation Cancelled")
		});
 }
 else if(!sayperms){
   const embed1 = new Discord.MessageEmbed()
     .setColor("BLUE")
     .setDescription("❌ You don't have permissions to use this command")
    
     message.channel.send(embed1)
 }
}
 if (command === "whois") {
const embed2 = new Discord.MessageEmbed()
    .setColor("BLUE")
     .setDescription("What's the ROBLOX username?")

message.channel.send(embed2)

let Author = message.author;
let Authorid = Author.id;

const filter1 = response1 => {
return response1.author.id === Authorid;
}

message.channel.awaitMessages(filter1, { max: 1 })
.then(collected1 => {
const response1 = collected1.first();

let username = response1.content
    
    if (username) {
        roblox.getIdFromUsername(username).then(id => {
          
          if (id) 
 
          {
            roblox.getPlayerInfo(parseInt(id)).then(function(info) 
 
            {
              let date = new Date(info.joinDate).toLocaleDateString()
            
              let embed = new Discord.MessageEmbed()
              .setColor("BLUE")
              .setTitle(info.username)
              .setURL(`https://roblox.com/users/${id}/profile`)
              .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
              .addField("Username", info.username || 'Unresolvable', true)
              .addField("User ID", id || 'Unresolvable', true)
              .addField("Account Age", `${info.age} days old ${date}` || 'Unresolvable', true)
              .addField("Description", info.blurb || 'Nothing', false)
              .addField("Status", info.status || 'Nothing', false)
              .setFooter(`City of Ottawa | Main Bot`)
              message.channel.send({embed})
            })
          }
          
        }).catch(function (err) {
         message.channel.send("Sorry, that user doesn't seem to exist.")
       });  
    } else { message.channel.send("Please provide a valid username..") }
  });
  }
});
client.on("message", async message =>{
   if(message.author.bot) return;
   if (!message.content.startsWith(prefix)) return;
 
 //commands
   const args = message.content.slice(prefix.length).trim().split(/ +/g);
   const command = args.shift().toLowerCase(); 
    const prchannel = client.channels.cache.get('776109067680612423');
    const sayperms = message.member.roles.cache.get("662234808495243264") || message.member.roles.cache.get("673576846973206528")


if(command === "leave") {
  message.channel.send("Leaving this server...")
  message.guild.leave()
  console.log("Great Left")
}
if(command === "globalban"){
  if(message.member.roles.cache.get("744691012013785148") || message.author.id === "344215641042976778")
  {
    const embed2 = new Discord.MessageEmbed()
    .setColor("BLUE")
     .setDescription("What's the user's discord id?")
     .setFooter("This command will automatically be cancelled in 30 seconds.")

message.channel.send(embed2)

let Author = message.author;
let Authorid = Author.id;

const filter1 = response1 => {
return response1.author.id === Authorid;
}

message.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time'] })
.then(collected1 => {
const response1 = collected1.first();
if(!response1.content){
  message.reply("Please provide the user's discord id")
}
client.guilds.cache.forEach(a => a.members.ban(response1.content))
message.channel.send("✅ the user was successfully banned in all Ottawa Servers")
 
 }).catch(collected1 => {
message.channel.send("Operation Cancelled")
		});
 }
}
if(command === "globalunban"){
  if(message.member.roles.cache.get("744691012013785148") || message.author.id === "344215641042976778")
  {
    const embed2 = new Discord.MessageEmbed()
    .setColor("BLUE")
     .setDescription("What's the user's discord id?")
     .setFooter("This command will automatically be cancelled in 30 seconds.")

message.channel.send(embed2)

let Author = message.author;
let Authorid = Author.id;

const filter1 = response1 => {
return response1.author.id === Authorid;
}

message.channel.awaitMessages(filter1, { max: 1 , time: 30000, errors: ['time'] })
.then(collected1 => {
const response1 = collected1.first();
if(!response1.content){
  message.reply("Please provide the user's discord id")
}
client.guilds.cache.forEach(a => a.members.unban(response1.content))
message.channel.send("✅ the user was successfully unbanned in all Ottawa Servers")
 
 }).catch(collected1 => {
message.channel.send("Operation Cancelled")
		});
 }
}
});
client.login(process.env.token); 


