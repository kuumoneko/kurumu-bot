const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { skipping } = require('../../Commands/Music/skip');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Play the next track!'),

	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {

		await interaction.deferReply({
			ephemeral: true
		})

		const result = await skipping(client, interaction);

		await interaction.followUp({
			embeds: result.message,
			ephemeral: true,
		})
	}
};