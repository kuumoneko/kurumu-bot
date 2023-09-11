const { CommandInteraction } = require('discord.js');
const { aclient } = require('/kurumu-bot/src/aclient');
const { helping } = require('../../Commands/Help/help');

module.exports = { help_prefix };
/**
 * 
 * @param {aclient} client 
 * @param {CommandInteraction} interaction
 */

async function help_prefix(client, interaction, command_helped) {
	const result = await helping(client, interaction, command_helped);

	await interaction.reply({
		embeds: result.message
	})

}