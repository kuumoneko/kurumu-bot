const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client, IntentsBitField } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus, entersState } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const _ = require("lodash");
const { add_to_queue } = require('./add_to_queue/__add_to_queue__');
const { QueryType, useQueue, useMainPlayer } = require('discord-player')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('setloop')
		.setDescription('set repeat for your queue')
		.addStringOption(mode =>
			mode.setName('mode')
				.setDescription('Chose your loop mode')
				.setRequired(true)
				.addChoices(
					{ name: 'Track', value: '1' },
					{ name: 'Queue', value: '2' },
					{ name: 'Autoplay', value: '3' },
					{ name: 'Disabled', value: '0' }
				)),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {

		const mode = interaction.options.getString('mode');

		const queue = useQueue(interaction.guildId);

		queue.setRepeatMode(Number(mode))

		var bruh = {
			0: 'Disabled Repeated mode',
			1: 'Track Repeated mode',
			2: 'Queue Repeated mode',
			3: 'Autoplay Mode'
		}


		await interaction.reply({
			content: `Your queue repeated mode has been change to ${bruh[Number(mode)]}`,
			ephemeral:true,	
		});
	},
};