const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { QueryType, useQueue, useMainPlayer } = require('discord-player')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Play the next track!'),
	// .addIntegerOption(numb =>
	// 	numb.setName('numb')
	// 		.setDescription('location of the track you wan to skip to')),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {
		await interaction.deferReply()
		const queue = useQueue(interaction.guildId);

		const curr_track = queue.currentTrack;

		queue.node.skip();

		await sleep(2000)

		const next_track = queue.currentTrack;


		await interaction.followUp({
			content: `${curr_track} has been skiped to ${next_track}`,
			ephemeral: true,

		});
	},
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
