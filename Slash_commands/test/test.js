const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client, Guild, VoiceChannel } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const _ = require("lodash");
const play = require('../music/play');
const pl = require('play-dl')
// const { joining } = require('../music/joinnig')
// const { playing } = require('../music/playing')
const { aclient } = require('/kurumu-bot/src/aclient.js')

const { QueryType, useQueue, useMainPlayer} = require('discord-player')
const { SpotifyExtractor, YouTubeExtractor, SoundCloudExtractor} = require('@discord-player/extractor')
// const got = require('got')
// const { add_to_queue } = require('./add_to_queue/__add_to_queue__')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('testing for search =)')
        .addStringOption(prompt =>
            prompt.setName('prompt')
                .setDescription('Support for Youtube, Spotify and Soundcloud'))
        .addStringOption(mode =>
            mode.setName('mode')
                .setDescription('set your search mode')
                .addChoices(
                    { name: 'Youtube', value: "youtube" },
                    { name: 'Spotify', value: "spotify" },
                    { name: 'Soundcloud', value: "soundcloud" },
                )),

    /**
     * @param {aclient} client 
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {

        const prompt = interaction.options.getString('prompt');
        // const mode = interaction.options.getString('mode');

        // const voice = interaction.voice

        await interaction.deferReply({
            ephemeral: true,
        })

        // await client.player.join(interaction.member.voice.channel)

        // let url = "https://open.spotify.com/track/6OzPP9Ax7YsgRWxDITRbRY?si=d46f01f6cb0e4180"; // a Spotify song URL

        const player = useMainPlayer()
        // let url = "https://youtube.com/playlist?list=PLoQgjm_qODrFJH754GCPnQNj0qVH4ebVg";

        // // const queue = useQueue(interaction.guildId)

        // var searchResult;

        // if (mode == 'youtube') {
        //     searchResult = await player.search(prompt, {
        //         requestedBy: interaction.user,
                
        //         searchEngine: QueryType.YOUTUBE_SEARCH,
        //     })
        // }
        // else if (mode == 'spotify') {
        //     searchResult = await player.search(prompt, {
        //         requestedBy: interaction.user,
        //         searchEngine: QueryType.SPOTIFY_SEARCH
        //     })
        // }
        // else if (mode == 'soundcloud') {
        //     searchResult = await player.search(prompt, {
        //         requestedBy: interaction.user,
        //         searchEngine: QueryType.SOUNDCLOUD_SEARCH,
        //     })
        // }
        // // searchResult.tracks
        // const { track } = await player.play(interaction.member.voice.channel, searchResult, {
        //     requestedBy: interaction.user,
        //     nodeOptions: {
        //         leaveOnEmpty: true,
        //         leaveOnEmptyCooldown: 300_000,
        //         leaveOnEnd: true,
        //         leaveOnEndCooldown: 300_000,
        //         leaveOnStop: true,
        //         leaveOnStopCooldown: 300_000,
        //         maxSize: 1000,
        //         maxHistorySize: 100,
        //         volume: 50,
        //         bufferingTimeout: 3000,
        //         connectionTimeout: 30000,
        //         metadata: {
        //             channel: interaction.channel,
        //             client: interaction.client,
        //             requestedBy: interaction.user,
        //             // track: searchResult.tracks[0]
        //         }
        //     }
        // });
        // // const result = await client.player.search(prompt, {
        // //     requestedBy: interaction.user,

        // // });


        // return;

        try {
            const voice = interaction.member.voice;
            // queue.forEach(async (item) => {

            // player.createPlaylist(prompt);



            const { track } = await player.play(interaction.member.voice.channel, prompt, {
                requestedBy: interaction.user,
                nodeOptions: {
                    leaveOnEmpty: true,
                    leaveOnEmptyCooldown: 300_000,
                    leaveOnEnd: true,
                    leaveOnEndCooldown: 300_000,
                    leaveOnStop: true,
                    leaveOnStopCooldown: 300_000,
                    maxSize: 1000,
                    maxHistorySize: 100,
                    volume: 50,
                    bufferingTimeout: 3000,
                    connectionTimeout: 30000,
                    metadata: {
                        channel: interaction.channel,
                        client: interaction.client,
                        requestedBy: interaction.user,
                        // track: searchResult.tracks[0]
                    }
                }
            });
            // const temp = track.que;
            // const moi = client.player.queues.cache;

            const queue = useQueue(interaction.guildId)

            await sleep(5000)
            queue.node.setPaused(true);


            await sleep(2000)

            queue.node.setPaused(false)
            // client.player.pause()

            // queuee.
            // client.player.

            // });
        }
        catch (e) {
            interaction.followUp({
                content: `Lỗi r ông: ${e}`,
                ephemeral: true
            })
            throw new Error(`${e}`)
        }

    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
