const { Message } = require('discord.js');
const { get_result } = require('../../Commands/AI/ai');

/**
 * 
 * @param {Message} interaction
 * @param {string} isPrivate 
 */

async function ai(interaction, prompt, chatbot) {
	await get_result(interaction, prompt, chatbot);
}

module.exports = {
	ai: ai,
}