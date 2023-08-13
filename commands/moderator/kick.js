const { SlashCommandBuilder, Client, CommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member!')
		.addUserOption(member =>
			member.setName('member')
			.setDescription('Who do you want to call?')
			.setRequired(true))
		.addStringOption(reason =>
			reason.setName('reason')
			.setDescription('Why you want to do to that?')),
	/**
	 * 
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
			
	async execute(client , interaction) {	
		await interaction.reply('This is kick command:)))) updating....');
	},
};