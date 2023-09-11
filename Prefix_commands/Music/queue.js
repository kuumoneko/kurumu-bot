const { CommandInteraction } = require('discord.js');
const _ = require('lodash')
const { see_queue } = require('../../Commands/Music/queue');

module.exports = { queue_prefix }

/**
 * 
 * all activities:
 * 
 * 		- See queue 		| Supported ✅
 * 		- Delete track(s)	| Supported ✅
 * 		- Skip to track		| Supported ✅
 * @param {CommandInteraction} interaction 
 */

async function queue_prefix(client, interaction) {

	await see_queue(client, interaction);

}
