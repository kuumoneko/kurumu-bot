const { CommandInteraction } = require('discord.js');
const { stopping } = require('../../Commands/Music/stop');

module.exports = { stop_prefix };

/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function stop_prefix(client, interaction) {

	const result = await stopping(client, interaction);
	await interaction.reply({
		embeds: result.message,
	});
}