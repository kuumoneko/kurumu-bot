const {  CommandInteraction, EmbedBuilder } = require('discord.js');
const { useQueue, useMainPlayer } = require('discord-player')
const _ = require('lodash')
const { playing } = require('./support/playing')

module.exports = { skipping }

/**
 * 
 * @param {CommandInteraction} interaction 
 */

async function skipping(client, interaction) {
	const infront = client.ctrack[interaction.guildId].shift();
	const inafter = client.ctrack[interaction.guildId].slice(1);

	client.ctrack[interaction.guildId] = inafter;

	if (_.get(client.isloop, interaction.guildId, undefined) === '2') {
		client.ctrack[interaction.guildId].push(infront)
	}
	else if (_.get(client.isloop, interaction.guildId, undefined) === '0') {
		client.ptrack[interaction.guildId].push(infront)
	}

	const queue = useQueue(interaction.guildId);

	const curr_track = queue.currentTrack.title;

	useQueue(interaction.guildId).node.stop();

	await playing(client, interaction);

	await new Promise((resolve) => setTimeout(resolve, 1000));
	var skiped_track;

	if (client.ctrack[interaction.guildId].length > 0) {
		skiped_track = (await useMainPlayer().search(client.ctrack[interaction.guildId][0]))._data.tracks[0].title
	}
	else {
		return {
			code: 200,
			message: [
				new EmbedBuilder()
					.setFooter({
						text: `Page 1 of 1`,
					})
					.setColor(client.get_color())
					.addFields(
						{
							name: `Your queue don't have any track`,
							value: '  '
						}
					)],
		}
	}

	return {
		code: 200,
		message: [
			new EmbedBuilder()
				.setTitle(`You have skipped track ${curr_track}`)
				.setColor(client.get_color())
				.setFields({
					name: `Current track:`,
					value: `${skiped_track}`
				})
		],
	}
}