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
const axios = require("axios");

/**
 *
 * @author Snuff (Snuff#8305)
 */
class CatCommand extends Command 
{
  constructor (client) 
  {
    super(client, 
        {
      name: "cat",
      description: "shows a random cat",
      guildOnly: false,
      botPermissions: ["EMBED_LINKS"]
    });
  }

  async run (message) 
  {
  // try to get the information from the api
  try 
  {
      // if the information comes out correctly
  const hr = await axios.get("https://some-random-api.ml/img/cat");
  this.client.reply(new MessageEmbed()
  .setColor(message.channel.type==="text" ? message.guild.me.displayColor||"" : "GREEN")
  .setImage(hr.data.link), message)
  }
  // if you can't get the information from the api
  catch(e) 
  {
   this.client.reactError(message);
  }
  }
}

module.exports = CatCommand
