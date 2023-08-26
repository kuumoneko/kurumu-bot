const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client, IntentsBitField } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus, entersState } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const _ = require("lodash");
const { add_to_queue } = require('./add_to_queue/__add_to_queue__');
const { QueryType, useQueue, useMainPlayer } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nplay')
        .setDescription('Show current track'),

    /**
     * 
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {
        const queue = useQueue(interaction.guildId);

        await interaction.reply({
            content: `Now playing: ${queue.currentTrack}`,
            ephemeral: true,
        })

    }

};
