const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client, IntentsBitField } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus, entersState } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const _ = require("lodash");
const { add_to_queue } = require('./add_to_queue/__add_to_queue__');
const { QueryType, useQueue, useMainPlayer } = require('discord-player')

module.exports = {
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
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {
        await interaction.deferReply({
            ephemeral: true,
        })

        var prompt = interaction.options.getString('prompt');
        const isloop = interaction.options.getString('isloopp') ?? 'None';
        const shuffle = interaction.options.getBoolean('isshuffle');
        const mode = interaction.options.getString('mode') ?? 'None';
        const id = interaction.guildId;
        const VoiceChannel = interaction.member.voice.channel;

        if (!VoiceChannel) {
            await interaction.followUp({
                content: `Please join a voice channel first :<`,
                ephemeral: true
            })
        }

        const player = useMainPlayer();

        var moi = "ksdjnkd";

        // moi.search(-1)
        if (prompt.search('youtu') != -1 || prompt.search('spotify') != -1 || prompt.search('soundclound') != -1) {
            await interaction.followUp({
                content: `Track(s) have been added to queue`,
                ephemeral: true,
            });
            if (prompt.search('&feature=shared') != -1) {
                prompt = prompt.split('&feature=shared')[0];

            }

            await player.play(VoiceChannel, prompt, {
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

        }
        else {
            const trackk = await add_to_queue(client, interaction, prompt, mode);

            if (trackk == 'None')
                return;
            
            await player.play(VoiceChannel, trackk, {
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

        }

        const queue = useQueue(interaction.guildId);

        if (shuffle == true)
            queue.tracks.shuffle();
        if (isloop !== 'None')
            queue.setRepeatMode(Number(isloop));

        
        if (!interaction.member.voice.channel) {
            await interaction.followUp({
                content: `Please join a voice channel first :<`,
                ephemeral: true,
            });

        }


    }
};
