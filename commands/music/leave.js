const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');
const vocie = require('@discordjs/voice');
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
		try {
			temp = vocie.getVoiceConnection(interaction.guild.id)

			temp.destroy()

			await interaction.reply({
				content: `I have leaved from <#${temp.joinConfig.channelId}>`,
				ephemeral: true,
			})
			return
		}
		catch (error) {
			await interaction.reply({
				content: `Something was wrong, please call Kuumo for help.\nError: ${error.message}`,
				ephemeral: true,
			})
			return
		}
	},
};