/*
 * Copyright 2021 Snuff.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *
 * @author Snuff (Snuff#8305)
 */

module.exports = class 
{
    constructor (client) 
    {
      this.client = client;
      this.prefix = "!!";
    }
    
    async run (message) 
    {
        // if the author of the message is a bot, it is not executed
        if(message.author.bot)
        return; 

        // if the bot is not allowed to speak on the channel
        if (message.guild && !message.channel.permissionsFor(message.guild.me).toArray().includes("SEND_MESSAGES")) 
        return;

        // if it doesn't start with the prefix
        if (!message.content.toLowerCase().startsWith(this.prefix.toLowerCase())) 
        return;

        const parts = splitOnPrefixLength(message.content, this.prefix.length);

        // get the command name
        const name = parts[0];

        // takes all arguments after the prefix
        const args = parts[1]==null ? "" : parts.slice(1).join(" ");

        // takes the command object
        const cmd = this.client.commands.get(name.toLowerCase()) || this.client.commands.get(this.client.aliases.get(name.toLowerCase()));
        console.log(args)
        if (!cmd)
         return;
        if(cmd.conf.ownerCommand==true && message.author.id!==this.client.ownerId)
        return;
         if(message.guild)
         {
             // if you are in the guild and the bot does not have the permissions
         if(message.channel.permissionsFor(message.guild.me).missing(cmd.conf.botPermissions).length!=0)
         {
            message.channel.send("\u274C I need " + cmd.conf.botPermissions.map(perm => formatPerms(perm)).join(", ") + " permissions to use this.");
            return; 
         }
         else if(!message.guild.me.hasPermission(cmd.conf.botPermissions))
         {
            message.channel.send("\u274C I need " + cmd.conf.botPermissions.map(perm => formatPerms(perm)).join(", ") + " permissions to use this.");
            return;
         }
        // checks if the user has the permissions
        if(message.channel.permissionsFor(message.member).missing(cmd.conf.userPermissions).length!=0)
         {
            message.channel.send("\u274C You need " + cmd.conf.userPermissions.map(perm => formatPerms(perm)).join(", ") + " permissions to use this.");
            return; 
         }
         else if(!message.member.hasPermission(cmd.conf.userPermissions))
         {
            message.channel.send("\u274C You need " + cmd.conf.userPermissions.map(perm => formatPerms(perm)).join(", ") + " permissions to use this.");
            return;
         }
        }
        // if you are not in a guild but the command can only be used in a guild
         else if (cmd.conf.guildOnly) 
        {
        message.channel.send("\u274C This command cannot be used in Direct Messages.");
        return; 
        }

        // try to start the command
         try 
        {
         await cmd.run(message, args);
        } 
        // if it fails it returns an error on the console
        catch(e)
        {
            console.error(e);
        }
    }
}

function splitOnPrefixLength(content, length)
{
    return content.substring(length).trim().split(/\s+/);
}

function formatPerms (perms) 
{
    var translator = {
           "CREATE_INSTANT_INVITE": "Create Invite",
           "KICK_MEMBERS": "Kick Members",
           "BAN_MEMBERS": "Ban Members",
           "ADMINISTRATOR": "Administrator",
           "MANAGE_CHANNELS": "Manage Channels",
           "MANAGE_GUILD": "Manage Server",
           "ADD_REACTIONS": "Add Reactions",
           "VIEW_AUDIT_LOG": "View Audit Log",
           "VIEW_CHANNEL": "Read Text Channels & See Voice Channels",
           "READ_MESSAGES": "Read Messages",
           "SEND_MESSAGES": "Send Messages",
           "SEND_TTS_MESSAGES": "Send TTS Messages",
           "MANAGE_MESSAGES": "Manage Messages",
           "EMBED_LINKS": "Embed Links",
           "ATTACH_FILES": "Attach Files",
           "READ_MESSAGE_HISTORY": "Read Message History",
           "MENTION_EVERYONE": "Mentions @everyone, @here, and All Roles",
           "EXTERNAL_EMOJIS": "External Emojis",
           "USE_EXTERNAL_EMOJIS": "Use External Emojis",
           "VIEW_GUILD_INSIGHTS": "View Server Insights",
           "CONNECT": "Connect",
           "SPEAK": "Speak",
           "MUTE_MEMBERS": "Mute Members",
           "DEAFEN_MEMBERS": "Deafen Members",
           "MOVE_MEMBERS": "Move Members",
           "USE_VAD": "Use Voice Activity",
           "PRIORITY_SPEAKER": "Priority Speaker",
           "CHANGE_NICKNAME": "Change Nickname",
           "MANAGE_NICKNAMES": "Manage Nicknames",
           "MANAGE_ROLES": "Manage Roles",
           "MANAGE_ROLES_OR_PERMISSIONS": "Manage roles or Permissions",
           "MANAGE_WEBHOOKS": "Manage Webhooks",
           "MANAGE_EMOJIS": "Manage Emojis",
           "STREAM": "Video"
       }
       return translator[perms];
  }
