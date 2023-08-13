const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ntrack')
		.setDescription('Play the next track!'),
	/**
	 * 
	 * @param {Client} client
	 * @param {CommandInteraction} interaction 
	 */
			
	async execute(client , interaction) {	
		await interaction.reply('This is ntrack command:)))) updating....');
	},
};