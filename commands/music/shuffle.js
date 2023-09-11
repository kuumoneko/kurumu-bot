const {  CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = { shuffling };

/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function shuffling(client, interaction) {

	var array = client.ctrack[interaction.guildId];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	client.ctrack[interaction.guildId] = array;

	return {
		code: 200,
		message: [
			new EmbedBuilder()
				.setColor(client.get_color())
				.setTitle(`Your queue has been shuffled`)
		]
	}
}