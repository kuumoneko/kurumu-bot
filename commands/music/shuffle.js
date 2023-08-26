const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { QueryType, useQueue, useMainPlayer } = require('discord-player')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Shuffle the track!'),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {

		const queue = useQueue(interaction.guildId)

		queue.tracks.shuffle();

		await interaction.reply(
			{
				content: 'Your queue has been shuflled :>',
				ephemeral: true,
			});
	},
};