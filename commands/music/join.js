const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');
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
		// Get the member from the guild
		const member = guild.members.cache.get(interaction.user.id);
		const voiceChannel = member.voice.channel;

		if (voiceChannel) {
			// Join the same voice channel as the user
			try {
				const moi = joinVoiceChannel({
					channelId: voiceChannel.id,
					guildId: guild.id,
					adapterCreator: guild.voiceAdapterCreator,
				});
				// return "Done";
				await interaction.followUp({
					content: `I have joined to ${voiceChannel}`,
					ephemeral : true,
				})

			}
			catch (error) {
				await interaction.followUp({
					content: `Something was wrong, please call Kuumo for help.\nError: ${error}`,
					ephemeral: true,
				})
			}
		}
		else {
			await interaction.reply({
					content: `I can't find your voice channel :< , please try again`,
					ephemeral: true,
				})
		}

	}
};