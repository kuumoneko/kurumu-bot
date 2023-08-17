const discord = require('discord.js')
const music = require('@discordjs/voice')
const deque = require('collections/deque.js')
const map = require('collections/map.js')
// const Number =require('')


class aclient
{
    constructor()
    {
        this.client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds] });

        // music
        this.ctrack = new map();
        this.ptrack = new map();

        this.isloop = new map(); 
    }

}

module.exports = aclient