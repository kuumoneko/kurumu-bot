const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, } = require('discord.js');
const { add_to_queue } = require('./support/__add_to_queue__');
const { useQueue, useMainPlayer } = require('discord-player')
const _ = require('lodash')
const {playing} = require('./support/playing')

const YOUTUBE_API_KEY = 'AIzaSyAunPKDmswMpyUiX2PdVqF9_MqF8DJA7GI';

// get a similar song from YouTube based on a video ID
async function getSimilarSong(videoId) {
    // construct the API URL with the relatedToVideoId filter
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${YOUTUBE_API_KEY}`;
    // fetch the response from the API
    const response = await fetch(url);
    // parse the response as JSON
    const data = await response.json();
    // get the first item from the results
    const item = data.items[0];
    // return the video ID and title of the similar song
    return {
        id: item.id.videoId,
        title: item.snippet.title
    };
}

module.exports = {
    playing: playing,
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play music!')
        .addStringOption(prompt =>
            prompt.setName('prompt')
                .setDescription('link or query'))
        .addBooleanOption(isshuffle =>
            isshuffle.setName('isshuffle')
                .setDescription('Do you want to shuffle the queue?'))
        .addStringOption(isloop =>
            isloop.setName('isloop')
                .setDescription('Chose your loop mode')
                .addChoices(
                    { name: 'Track', value: '1' },
                    { name: 'Queue', value: '2' },
                    { name: 'Autoplay', value: '3' },
                    { name: 'Disabled', value: '0' }
                ))
        .addStringOption(mode =>
            mode.setName('mode')
                .setDescription('set your search mode(only use for search query)')
                .addChoices(
                    { name: 'Youtube', value: "youtube" },
                    { name: 'Spotify', value: "spotify" },
                    { name: 'Soundcloud', value: "soundcloud" },
                )),

    /**
     *  
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {
        await interaction.deferReply({
            ephemeral: true,
        })

        var prompt = interaction.options.getString('prompt') ?? undefined;
        const isloop = interaction.options.getString('isloop') ?? 'None';
        const shuffle = interaction.options.getBoolean('isshuffle');
        const mode = interaction.options.getString('mode') ?? 'None';
        const VoiceChannel = interaction.member.voice.channel;



        if (!VoiceChannel) {
            await interaction.followUp({
                content: `Please join a voice channel first :<`,
                ephemeral: true
            })
            return;
        }


        const player = useMainPlayer();
        var tracks;

        if (prompt.search('youtu') != -1 || prompt.search('spotify') != -1 || prompt.search('soundcloud') != -1) {

            if (prompt.search('&feature=shared') != -1) {
                prompt = prompt.split('&feature=shared')[0];
            }

            tracks = await player.search(prompt);
        }
        else if (prompt !== undefined) {
            tracks = await add_to_queue(client, interaction, prompt, mode);
            if (tracks == [])
                return;
        }
        else {
            return;
        }

        if (_.get(client.ctrack, interaction.guildId, 'None') === 'None') {
            client.ctrack[interaction.guildId] = []
            client.ptrack[interaction.guildId] = []
        }

        tracks._data.tracks.forEach(item => {
            client.ctrack[interaction.guildId].push(item.url);
        })

        await interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.get_color())
                    .setFields({
                        name: `I have added some tracks to queue`,
                        value: `Number of tracks: ${tracks._data.tracks.length}`
                    })
            ],
            ephemeral: true,
        });

        if (shuffle == true) {
            var array = client.ctrack[interaction.guildId];
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }

            client.ctrack[interaction.guildId] = array;
        }

        if (isloop !== 'None') {
            client.isloop[interaction.guildId] = isloop;
        }
        else {
            client.isloop[interaction.guildId] = (_.get(client.isloop, interaction.guildId, 'None') === 'None') ? '0' : client.isloop[interaction.guildId];
        }

        await playing(client, interaction);
    }

};