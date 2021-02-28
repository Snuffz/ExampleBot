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

/**
 *
 * @author Snuff (Snuff#8305)
 */
class AboutCommand extends Command 
{
  constructor (client) 
  {
    super(client, 
      {
      name: "about",
      description: "shows information about the bot",
      guildOnly: false,
      botPermissions: ["ADMINISTRATOR"]
    });
  }

  async run (message) 
  {
this.client.reply(new MessageEmbed()
.setAuthor("All information about example bot", this.client.user.displayAvatarURL())
.setDescription("This is an example bot made in [discord.js](https://discord.js.org/#/) of the repository\n" 
+"\n```diff\n+ Fun commands\n" 
+ "+ Bot with useful commands\n"
+ "+ Good examples"
+ "\n```"), message)
  }
}

module.exports = AboutCommand
