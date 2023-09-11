const { CommandInteraction, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player')

module.exports = { stopping }
/**
 * 
 * 
 * @param {CommandInteraction} interaction 
 */

async function stopping(client, interaction) {
	const queue = useQueue(interaction.guildId);

	if (!queue.deleted) {
		const channell = queue.channel;
		client.ctrack[interaction.guildId] = []

		queue.setRepeatMode(0);

		queue.clear();

		queue.node.stop();

		queue.delete();

		return {
			code: 200,
			message: [
				new EmbedBuilder()
					.setColor(client.get_color())
					.setTitle(`I have stopped and leaved ${channell}`)
			],
		}
	}

	return {
		code: 200,
		message: [
			new EmbedBuilder()
				.setColor(client.get_color())
				.setTitle(`I have stopped and leaved Voice channel`)
		],
	}
}