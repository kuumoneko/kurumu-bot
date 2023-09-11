const {  CommandInteraction } = require('discord.js');
const { shuffling } = require('../../Commands/Music/shuffle');

module.exports = { shuffle_prefix };

/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function shuffle_prefix(client, interaction) {

	const result = await shuffling(client, interaction);

	await interaction.reply({
		embeds: result.message,
	})
}