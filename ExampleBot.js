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
const { Client, Collection } = require("discord.js"); 
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const klaw = require("klaw");
const path = require("path");
/**
 *
 * @author Snuff (Snuff#8305)
 */

class Bot extends Client 
{
  constructor (options) 
  {
    super(options);

    // define the config.js folder
    this.config = require("./config.js");

    // get the token from the config
    this.token = this.config.TOKEN;

    // get the owner id from the config
    this.ownerId = this.config.OWNER_ID;

    // creates a collection of discord.js identical to a Map object
    this.commands = new Collection();

    // set the aliases
    this.aliases = new Collection();

    // this is the same as the common setTimeout, but using the client
    this.wait = require("util").promisify(setTimeout);

    // uses discord.js's awaitMessages method to send and wait for a response
    this.awaitReply = async (msg, question, limit = 60000) => 
    {
        // filters so that only the author of the message can reply
        const filter = m => m.author.id === msg.author.id;

        // try the method
        await msg.channel.send(question, msg);
        try 
        {
            // start the method
          const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
          return collected.first().content;
        } 
        catch (e) 
        {
          return false;
        }
      };
  }

// this function is used to load all commands
  loadCommand (commandPath, commandName) 
  {

    // here he tries to start the folder
    try 
    {

        // it starts the folder using the proposed functions
      const props = new (require(commandPath+path.sep+commandName))(this);
      props.conf.location = commandPath;

      // if the function can be started, it starts
      if (props.init) 
      {
        props.init(this);
      }

      // here it sets the command name and the command object in the collection
      this.commands.set(props.help.name, props);

      // here he takes the generated array and uses the forEach method
      props.conf.aliases.forEach(alias => 
        {

            // here it sets the name and the command object in the aliases collection
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } 
    catch (e)
     {

        // if he is unable to start the folder, returns an error on the console
    console.error(e);
    return;
    }
  }
}
  
  const client = new Bot({ disableMentions: "everyone" });
   
  // here it creates a function to initiate all commands and events
  const build = async () => 
  {

      // takes all files from the commands folder
  klaw("./commands").on("data", (item) => 
  {
    const cmdFile = path.parse(item.path);

    // here it filters files that don't end in .js
    if (!cmdFile.ext || cmdFile.ext !== ".js") 
    return;

    // here it uses the loadCommand function to load the commands
    const response = client.loadCommand(cmdFile.dir, cmdFile.name+cmdFile.ext);

    // if there is an error it will return on the console
    if (response) 
    console.error(response);
  });

    // it takes all files from the events folder as an array
  const evtFiles = await readdir("./events/");

  // the forEach method is used to execute each array value in turn
  evtFiles.forEach(file => 
    {

    // get the name before . of the file
    const eventName = file.split(".")[0];

    // starts the event using the client
    const event = new (require("./events/"+file))(client);

    // start the event
    client.on(eventName, (...args) => event.run(...args));
  });

  // turn on the bot using the token
client.login(client.token)
  }

  // here the build function is called
  build();

// exports all information
module.exports.Client = client;
