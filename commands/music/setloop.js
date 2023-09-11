const { CommandInteraction, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player')


module.exports = { set_loop };

/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function set_loop(client, interaction, mode) {

	const queue = useQueue(interaction.guildId);

	queue.setRepeatMode(Number(mode))
	client.isloop[interaction.guildId] = mode;

	var bruh = {
		0: 'Disabled Repeated mode',
		1: 'Track Repeated mode',
		2: 'Queue Repeated mode',
		3: 'Autoplay Mode'
	}

	return {
		code: 200,
		message: [
			new EmbedBuilder()
				.setColor(client.get_color())
				.addFields({
					name: `Current queue repeated mode has been changed`,
					value: `Current: ${bruh[Number(mode)]}`
				})
		]
	};
}