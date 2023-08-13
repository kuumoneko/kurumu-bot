const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setloop')
		.setDescription('set loop=)!'),
	/**
	 * 
	 * @param {Client} client
	 * @param {CommandInteraction} interaction 
	 */
			
	async execute(client , interaction) {	
		await interaction.reply('This is setloop command:)))) updating....');
	},
};