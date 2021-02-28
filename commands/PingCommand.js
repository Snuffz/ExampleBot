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
class PingCommand extends Command 
{
  constructor (client) 
  {
    super(client, {
      name: "ping",
      description: "show my ping",
      guildOnly: false
    });
  }

  async run (message) 
  {
      // sends the pong message
    const m = await message.channel.send("Pong!");

    // subtracts the creation of the pong message from that of the author's message
    const tLatency = m.createdTimestamp - message.createdTimestamp;

    // sends the message along with the ping of the websocket
    m.edit(`Ping: ${tLatency}ms\nWebSocket: ${Math.round(this.client.ws.ping)}ms`);
  }
}

module.exports = PingCommand
