const { SlashCommandBuilder, Client, CommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bans')
		.setDescription('See bans list and unban member!'),
	/**
	 * 
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
			
	async execute(client , interaction) {	
		await interaction.reply('This is bans command:)))) updating....');
	},
};