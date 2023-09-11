const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { join_voice } = require('../../Commands/Music/join');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join the your voice channel!'),

	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {

		await interaction.deferReply({
			ephemeral: true,
		})

		const joinn = await join_voice(client, interaction);

		if (joinn.code === 200) {
			await interaction.followUp({
				embeds: joinn.message
			});
		}
		else if (joinn.code === 500) {
			await interaction.followUp({
				embeds: joinn.message
			});
		}
		else {
			await interaction.followUp({
				embeds: joinn.message
			});
		}
	}
};