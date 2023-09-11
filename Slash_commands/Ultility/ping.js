const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { get_ping } = require('../../Commands/Ultility/ping');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {
		await interaction.deferReply({
			ephemeral: true,
		})

		const result = await get_ping(client, interaction);

		await interaction.followUp({
			embeds: result.message,
			ephemeral: true,
		})
	},
};