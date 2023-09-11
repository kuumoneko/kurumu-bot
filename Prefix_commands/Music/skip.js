const { CommandInteraction } = require('discord.js');
const { skipping } = require('../../Commands/Music/skip');

module.exports = { skip_prefix };


/**
 * 
 * @param {CommandInteraction} interaction 
 */

async function skip_prefix(client, interaction) {

	const result = await skipping(client, interaction);

	await interaction.reply({
		embeds: result.message,
	})
}