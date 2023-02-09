// Copyright (c) by Philip
// Licensed under the MIT License.

const Discord = require('discord.js');
const bot = new Discord.Client();
const { prefix, cookie, color } = require('./config.json'); // Get your token, prefix and cookie from here..
const nblx = require("noblox.js"); // The module of roblox..
const fs = require('fs');
const path = require("path");
const config = require('./config.json');

var groupId = 12475608 // Your group id

// To change the permissions go to line 30, 56, 99 ,127, 155, 176

// Logining in..
nblx.setCookie("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_B2610BBCFC41451AA953AA136341944CADB5FC9C363A38A0A52A5AFCB78F03FED69BEB33321B7B0180888B36A3DB69AA03F34C64B76FC33E441B684806C6E7C960C15EFB794A7572800CA479ADF94479226E1093D8AD1AE79E97BB84B7BE26973FCD46DDAACF745AFF6677402251DCAD97FD162E7FDF074DAD8717E4EAAE6CED64D09A0F4AE25B2751095C73904E088069F0A6DE4A2449324DD1A9D14FFA044783074D731C6BB9BEDF90B69EF46B632B4A6C2B0025C6E93661C6CC19A5CC51744833D276C2994370863AD225C9D32C1EDA8F8CB3056F16FD97C85A38A61E935438C6E66E754ADBDAE231B66C0C01587F1574CF173270CF564ABCAF02AC28D3EB7AFF412AD8BF4494E581F58D5AC89D1D9F2C3F275924C780CACC38F0B0EACD7D029A6ACB00B966DC843E7C1E2F15050841B5C10D4F6DA08C186CE7BC201ACFA748B9DD8104B31E23AA0220EFAA36C138AD06EBC7AD0EF56190AC65455B853C383D6CE0A96E2F60345D095D8268D1DD6F182FA8F30A425FFAEAEAECD5D25E638F20DA7510") // Logs into the acc
bot.on('ready', () => {
	console.log(`Nobloxjs bot is ready! and logged in as ${bot.user.tag}`); // Make bot online..
});


//  All the commands! do not edit ( you can edit msgs )

bot.on("message", message => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command ===  "accept") {
        const member = message.author;
        const name = message.author.username;
        const url = member.displayAvatarURL();
        if(message.member.hasPermission('ADMINISTRATOR')) {
        if (!args[0]) {
            message.channel.send(":x: Please put member name!")
        } else {
            const mem = args[0];
            nblx.getIdFromUsername(mem).then(id => {
                if(!id){
                    message.channel.send(":x: I can't find that user in group requests!!");
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setColor(`${color}`)
                    .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                    .setTitle("Roblox Group Accepter")
                    .setDescription(`Accepted **${args}** (${id}) in the group!`)
                    nblx.handleJoinRequest(groupId, id, true)
                    message.channel.send(embed);
                }
            });
            console.log(args[0]);
        }
    } else {
        message.channel.send(":x: You don't have requied roles to use this command.");
    }
    }
    if (command === "promote") {
        const member = message.author;
        const name = message.author.username;
        const url = member.displayAvatarURL();
        if(message.member.hasPermission('ADMINISTRATOR')) { 
        if (!args[0]) {
            message.channel.send(":x: Please put member name!")
        } else {
            const mem = args[0];
            nblx.getIdFromUsername(mem).then(id => {
                if(!id){
                    message.channel.send(":x: I can't find that user in group!!");
                } else {
                    nblx.changeRank(groupId, id, 1)
                    const embed = new Discord.MessageEmbed()
                    .setColor(`${color}`)
                    .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                    .setTitle("Roblox Group Promoter")
                    .setDescription(`Promoted **${args}** (${id}) in the group!`)
                    message.channel.send(embed);
                }
        });
    }
} else {
    message.channel.send(":x: You don't have requied roles to use this command.");
}
}

if (command === "help") {
    const member = message.author;
        const name = message.author.username;
        const url = member.displayAvatarURL();
        const embed = new Discord.MessageEmbed()
        .setColor(`${color}`)
        .setThumbnail(`${bot.user.displayAvatarURL()}`)
        .setTitle(`${bot.user.username} Commands`)
        .setDescription(`${prefix}help -- Shows command list\n${prefix}accept [player_name] -- Accepts player in group\n${prefix}promote [player_name] -- Promote that player by 1 rank\n${prefix}demote [player_name] -- Demote that player by 1 rank\n${prefix}shout [msg] -- Shouts the message on the group wall..\n${prefix}postwall [msg] -- Posts the msg on wall..\n${prefix}kick [player_Name] -- Kicks player from group.`)
        .setFooter(`${name}`,`${url}`)
        message.channel.send(embed);
}

if (command === "demote") {
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if(message.member.hasPermission('ADMINISTRATOR')) {
    if (!args[0]) {
        message.channel.send(":x: Please put member name!")
    } else {
        const mem = args[0];
        nblx.getIdFromUsername(mem).then(id => {
            if(!id){
                message.channel.send(":x: I can't find that user in group!!");
            } else {
                nblx.changeRank(groupId, id, -1)
                const embed = new Discord.MessageEmbed()
                .setColor(`${color}`)
                .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                .setTitle("Roblox Group Demoter")
                .setDescription(`Demoted **${args}** (${id}) in the group!`)
                message.channel.send(embed);
            }
    });
}
} else {
message.channel.send(":x: You don't have requied roles to use this command.");
}
}

if (command === "kick") {
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if(message.member.hasPermission('ADMINISTRATOR')) {
    if (!args[0]) {
        message.channel.send(":x: Please put member name!")
    } else {
        const mem = args[0];
        nblx.getIdFromUsername(mem).then(id => {
            if(!id){
                message.channel.send(":x: I can't find that user in group!!");
            } else {
                nblx.exile(groupId, id)
                const embed = new Discord.MessageEmbed()
                .setColor(`${color}`)
                .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                .setTitle("Roblox Group Kicker")
                .setDescription(`**${args}** (${id}) is now kicked from the group!`)
                message.channel.send(embed);
            }
    });
}
} else {
message.channel.send(":x: You don't have requied roles to use this command.");
}
}

if (command === "shout") {
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if(message.member.hasPermission('ADMINISTRATOR')) { 
    if (!args[0]) {
        message.channel.send(":x: Please put the message!")
    } else {
        const embed = new Discord.MessageEmbed()
                .setColor(`${color}`)
                .setThumbnail(`${nblx.getLogo(groupId)}`)
                .setTitle("Roblox Group Announcer")
                .setDescription(`Successfully announced: **${args}** in group shout!`)
                message.channel.send(embed);
                nblx.shout({ group: groupId, message: `${args}` })
    }
    } else {
        message.channel.send(":x: You don't have requied roles to use this command.");
    }
}

if (command === "postwall") {
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if(message.member.hasPermission('ADMINISTRATOR')) {  // Change role name here
    if (!args[0]) {
        message.channel.send(":x: Please put the message!")
    } else {
        const embed = new Discord.MessageEmbed()
                .setColor(`${color}`)
                .setThumbnail(`${nblx.getLogo(groupId)}`)
                .setTitle("Roblox Group Wall")
                .setDescription(`Successfully posted: **${args}** on the group wall!`)
                message.channel.send(embed);
                nbx.post(groupId, `${args}`)
    }
    } else {
        message.channel.send(":x: You don't have requied roles to use this command.");
    }
}

});

// Starts the bot
bot.login(process.env.token);
