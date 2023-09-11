const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { leave_voice } = require('../../Commands/Music/leave');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Leave current voice channel!'),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {
		await interaction.deferReply({
			ephemeral: true,
		})

		const lea = await leave_voice(client, interaction);

		if (lea.code === 200) {
			await interaction.followUp({
				embeds: lea.message,
				ephemeral: true
			});
		}
		else if (lea.code === 500) {
			await interaction.followUp({
				embeds: lea.message,
				ephemeral: true
			});
		}
		else {
			await interaction.followUp({
				embeds: lea.message,
				ephemeral: true
			});
		}
	},
};