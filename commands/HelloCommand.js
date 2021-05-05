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
module.exports = class HelloCommand extends Command 
{
  constructor (client) 
  {
    super(client, {
      name: "hello",
      aliases: ["hi","hey"],
      help: "say hello and wait for the answer"
    });
  }

  async run (message) 
  {
      // starts a waiting event; say your name
const e = await this.client.awaitReply(message, "Hello what is your name?", 60000);

// if a minute goes unanswered
if(e === false)
{
message.channel.send("You took too long, time is up.");
return;
}

// the answer sent by the author, it will be sent after the event ends
message.channel.send("Hello `"+e+"`! Glad to meet you, i'm `"+this.client.user.username+"`!");
  }
}
