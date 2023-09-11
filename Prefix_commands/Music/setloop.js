const { CommandInteraction } = require('discord.js');
const { set_loop } = require('../../Commands/Music/setloop');


module.exports = { setloop_prefix };

/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function setloop_prefix(client, interaction, mode) {

	var moi = 'moi';

	moi.toLowerCase()
	var bruh = {
		'track': '1',
		'queue': '2',
		'autoplay': '3',
		'disabled': '0'
	}

	const result = await set_loop(client, interaction, bruh[mode.toLowerCase()])


	await interaction.reply({
		embeds: result.message
	});
}