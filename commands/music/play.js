const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play music!')
		.addStringOption(prompt =>
			prompt.setName('prompt')
				.setDescription('Youtube link or search on Youtube'))
		.addBooleanOption(isloop =>
			isloop.setName('isloop')
				.setDescription('Do you want to repeat your track?'))
		.addStringOption(shuffle =>
			shuffle.setName('shuffle')
				.setDescription('What mode you want to shuffle or None')),

	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction 
	 */

	async execute(client, interaction) {
		await interaction.reply('This is play command:)))) updating....');
	},
};