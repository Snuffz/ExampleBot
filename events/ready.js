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
    }
    
    async run () 
    {
        // set status to online
        await this.client.user.setStatus("online");

        // this is the default activity, change the prefix to whatever you are going to use
        await this.client.user.setActivity("Use !!help");
    }
}
