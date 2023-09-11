const { CommandInteraction } = require('discord.js');
const { get_ping } = require('../../Commands/Ultility/ping');

module.exports = { ping_prefix }
/**
 * 
 * 
 * @param {CommandInteraction} interaction
 */

async function ping_prefix(client, interaction) {

	const result = await get_ping(client, interaction);
	await interaction.reply({
		embeds: result.message,
	})
}