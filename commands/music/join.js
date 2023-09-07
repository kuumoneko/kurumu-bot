const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
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

		const guild = client.client.guilds.cache.get(interaction.guildId);
		const member = guild.members.cache.get(interaction.user.id);
		const voiceChannel = member.voice.channel;

		if (voiceChannel) {
			try {
				joinVoiceChannel({
					channelId: voiceChannel.id,
					guildId: guild.id,
					adapterCreator: guild.voiceAdapterCreator,
				});
				await interaction.followUp({
					embeds: [
						new EmbedBuilder()
							.setColor(client.get_color())
							.addFields({
								name: `I have joined a voice channel`,
								value: `Voice channel: ${voiceChannel}`,
							})
					],
					ephemeral: true,
				});
			}
			catch (error) {
				await interaction.followUp({
					embeds: [
						new EmbedBuilder()
							.setColor(client.get_color())
							.addFields({
								name: `I can't join a voice channel`,
								value: `Error: ${error}`,
							})
					],
					ephemeral: true,
				});
			}
		}
		else {
			await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields({
							name: `I can't join a voice channel`,
							value: `Error: Can't find your voice channel`,
						})
				],
				ephemeral: true,
			});
		}

	}
};