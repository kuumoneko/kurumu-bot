const { SlashCommandBuilder, Client, CommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {
		await interaction.reply(`Pong! Now , Ping of Kurumu is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.client.ws.ping)}ms`);
	},
};