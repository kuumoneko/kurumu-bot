const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop play and leave!'),
	/**
	 * 
	 * @param {Client} client
	 * @param {CommandInteraction} interaction 
	 */
			
	async execute(client , interaction) {	
		await interaction.reply('This is stop command:)))) updating....');
	},
};