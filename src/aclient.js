const discord = require('discord.js')
const music = require('@discordjs/voice')
const deque = require('collections/deque.js')
const map = require('collections/map.js')
const { Player } = require('discord-player')
const { SpotifyExtractor, YouTubeExtractor, SoundCloudExtractor } = require('@discord-player/extractor')


// const Number =require('')


class aclient {
    constructor() {
        this.client = new discord.Client({
            intents: [discord.GatewayIntentBits.Guilds,
            // discord.IntentsBitField.Flag,
            discord.GatewayIntentBits.GuildVoiceStates]
        });

        // music
        this.player = new Player(this.client, {
            ytdlOptions: {
                quality: 'highestaudio',
            },

        })



        // this.queue = this.player.createPlaylist()
        // this.q = this.player.queues.cache.
        // this.q.
        this.ctrack = new map();
        this.ptrack = new map();
        this.curr_track = new map();

        this.isloop = new map();
        this.color = [
            0xCD5C5C, 0xFF6A6A, 0xEE6363, 0xCD5555, 0x8B3A3A, 0xB22222, 0xFF3030, 0xEE2C2C, 0xCD2626, 0x8B1A1A, 0xA52A2A, 0xFF4040, 0xEE3B3B,
            0x8B2323, 0xFF8C00, 0xFF7F00, 0xEE7600, 0xCD6600, 0xFF6347, 0xEE5C42, 0xFF4500, 0xEE4000, 0xFF0000, 0xEE0000, 0xDC143C, 0xCD3333,
        ]
    }

    get_color() {
        var rand = Math.floor(Math.random() * this.color.length)

        return this.color[rand - 1];
    }

}

module.exports = aclient