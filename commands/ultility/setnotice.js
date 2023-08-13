const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setnotice')
		.setDescription('Set your notification for your server(only for member join o leave)!'),
	/**
	 * 
	 * @param {Client} client
	 * @param {CommandInteraction} interaction 
	 */
			
	async execute(client , interaction) {	
		await interaction.reply('This is setnotice command:)))) updating....');
	},
};