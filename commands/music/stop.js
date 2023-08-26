const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const { QueryType, useQueue, useMainPlayer } = require('discord-player')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop play and leave!'),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {

		await interaction.deferReply()

		const queue = useQueue(interaction.guildId);

		if (!queue.deleted) {
			queue.setRepeatMode(0);
			queue.clear();
			queue.node.stop();
			queue.delete();

			await interaction.followUp({
				content: `I have stopped and leaved ${queue.channel}`,
				ephemeral: true,
			});
			return;
		}


		await interaction.followUp({
			content: `I have stopped and leaved Voice channel`,
			ephemeral: true,
		});
	},
};