const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { stopping } = require('../../Commands/Music/stop');

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

		await interaction.deferReply({
			ephemeral: true,
		})

		const result = await stopping(client, interaction);

		await interaction.followUp({
			embeds: result.message,
			ephemeral: true
		});
	},
};