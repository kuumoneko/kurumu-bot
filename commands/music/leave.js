const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');
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
			if (temp) {
				temp.destroy()

				await interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setColor(client.get_color())
							.addFields({
								name: `I have leaved current voice channel`,
								value: `Voice channel: <#${temp.joinConfig.channelId}>`,
							})
					],
					ephemeral: true,
				});
			}
			else {
				await interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setColor(client.get_color())
							.addFields({
								name: `I can't leave current voice channel`,
								value: `Error: I'm not in any voice channel`,
							})
					],
					ephemeral: true,
				});
			}
		}
		catch (error) {
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields({
							name: `I can't leave current voice channel`,
							value: `Error: ${error}`,
						})
				],
				ephemeral: true,
			});
		}
	},
};