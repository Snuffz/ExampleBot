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
class ShutdownCommand extends Command 
{
  constructor (client) 
  {
    super(client, {
      name: "shutdown",
      description: "safely shuts down",
      guildOnly: false,
      ownerCommand: true
    });
  }

  async run (message) 
  {
this.client.replyWarning("Shutting down...", message);

// closes the connection of the discord api with the bot and destroys the client
this.client.destroy();
  }
}

module.exports = ShutdownCommand
