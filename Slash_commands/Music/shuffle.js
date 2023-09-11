const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { shuffling } = require('../../Commands/Music/shuffle');

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
		await interaction.deferReply({
			ephemeral: true,
		})

		const result = await shuffling(client, interaction);

		await interaction.followUp(
			{
				embeds: result.message,
				ephemeral: true,
			});
	},
};