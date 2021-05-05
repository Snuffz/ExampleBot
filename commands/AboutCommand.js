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
const { MessageEmbed } = require("discord.js");
const Command = require("../base/Command.js");
const features = Array("Fun commands", "Bot with useful commands", "Good examples");

/**
 *
 * @author Snuff (Snuff#8305)
 */
module.exports = class AboutCommand extends Command 
{
  constructor (client) 
  {
    super(client, 
      {
      name: "about",
      help: "shows information about the bot",
      guildOnly: false,
      botPermissions: ["ADMINISTRATOR"]
    });
  }

  async run (message) 
  {
const builder = new MessageEmbed();
builder.setColor(message.channel.type=="text" ? message.guild.me.displayColor||null : null);
builder.setAuthor("All information about " + this.client.user.username, this.client.user.displayAvatarURL());
var descr = new String("This is an example bot made in [discord.js](https://discord.js.org/#/) of the repository [ExampleBot](https://github.com/Snuffz/ExampleBot)\n\n```css");
for(const feature of features)
            descr+="\n"+feature;
descr+=" ```";
builder.setDescription(descr);
builder.addField("Stats", this.client.guilds.cache.size + " Servers\nShard " + (this.client.shard==null || message.channel.isText()===false ? "1" : message.guild.shard.id)
+ "/" + this.client.ws.totalShards, true);
builder.addField("Users", this.client.users.cache.size + " Cached\n" + this.client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)+" Total", true);
builder.addField("Channels", this.client.channels.cache.filter(c => c.type=="text").size + " Text\n" + this.client.channels.cache.filter(c => c.type=="voice").size + " Voice", true);
builder.setFooter("Last restart");
builder.setTimestamp(Date.now()-this.client.uptime);
message.channel.send(builder);
  }

}
