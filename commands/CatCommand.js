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
module.exports = class CatCommand extends Command 
{
  constructor (client) 
  {
    super(client, 
        {
      name: "cat",
      help: "shows a random cat",
      botPermissions: ["EMBED_LINKS"],
      guildOnly: false
    });
  }

  async run (message) 
  {
  // try to get the information from the api
  try 
  {
      // if the information comes out correctly
  const hr = await axios.get("https://some-random-api.ml/img/cat");
  message.channel.send(new MessageEmbed()
  .setColor(message.channel.type=="text" ? message.guild.me.displayColor||null : "GREEN")
  .setImage(hr.data.link))
  }
  // if you can't get the information from the api
  catch(ue) 
  {
   message.react("\u274C")
  }
  }
}
