const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { see_queue } = require('../../Commands/Music/queue');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('See the queue or make change tracks!'),


	/**
	 * 
	 * all activities:
	 * 
	 * 		- See queue 		| Supported ✅
	 * 		- Delete track(s)	| Supported ✅
	 * 		- Skip to track		| Supported ✅
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {
		await interaction.deferReply({
			ephemeral: true
		})

		await see_queue(client, interaction);
	},
};
