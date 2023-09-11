const { CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = { get_ping }
/**
 * 
 * 
 * @param {CommandInteraction} interaction
 */

async function get_ping(client, interaction) {
	return {
		code: 200,
		message: [
			new EmbedBuilder()
				.setTitle(`CLient's Latency`)
				.setColor(client.get_color())
				.addFields([
					{
						name: `Ping:`,
						value: `${Date.now() - interaction.createdTimestamp}ms`
					},
					{
						name: `API Latency:`,
						value: `${Math.round(client.client.ws.ping)}ms`
					}
				])
		],
	};
};