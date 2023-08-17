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

		const guild = client.client.guilds.cache.get(interaction.guildId);
		// Get the member from the guild
		const member = guild.members.cache.get(interaction.user.id);

		// cn = interaction.member.voice.channel
		const voiceChannel = member.voice.channel;

		if (voiceChannel) {
			// Join the same voice channel as the user
			try {
				const connection = joinVoiceChannel({
					channelId: voiceChannel.id,
					guildId: interaction.guildId,
					adapterCreator: interaction.guild.voiceAdapterCreator,
				});

				await interaction.reply({
					content: `I have joined ${voiceChannel}. Let's play something`,
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



		}
		else {
			await interaction.reply({
				content: `I can't find your voice channel :< , please try again`,
				ephemeral: true,
			})
			return
		}
	},
};