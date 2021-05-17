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
const Command = require("../base/Command.js");

/**
 *
 * @author Snuff (Snuff#8305)
 */
module.exports = class ChooseCommand extends Command 
{
  constructor (client) 
  {
    super(client, 
        {
      name: "choose",
      help: "choose a random item",
      usage: "<item1> <item2> <item3...>",
      guildOnly: false
    });
  }

  async run (message, args) 
  {
      // checks if the message has no options
  if(args.length==0)
  {
      message.channel.send("\u26A0\uFE0F You must provide me with choices!");
      return;
  }
else 
{
  // split the choices on all whitespace
  const items = args.split(/\s+/);
  
    // if you have only one option provided
    if(items.length==1)
    message.channel.send("\u26A0\uFE0F You just gave me the option `"+items[0]+"`");

    // takes a random response
    else 
    {
       message.channel.send("\u2705 I choose `"+items[Math.floor(Math.random() * items.length)]+"`")
      }
}
  }
}
