const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join the your voice channel!')
		.addChannelOption(channel =>
			channel.setName('channel')
			.setDescription('What channel you me to join?')),

	/**
	 * 
	 * @param {Client} client
	 * @param {CommandInteraction} interaction 
	 */
			
	async execute(client , interaction) {	
		await interaction.reply('This is join command:)))) updating....');
	},
};