const { CommandInteraction, Message } = require('discord.js');
const aclient = require('../../src/aclient');
const { conversation_style } = require('bingai-js');

/**
 * @param {aclient} client 
 * @param {CommandInteraction} interaction 
 * @param {Message} interaction
 * @param {string} prompt 
 * @param {string} chatbot 
 */
async function AI(client, interaction, prompt, chatbot) {
	try {
		return new Promise(async (resolve) => {
			if (chatbot == "bard") {
				await client.BardChatBot.ask(prompt).then(data => {
					resolve(data)
				});
			}

			else {
				await client.EdgeChatBot.init()
				var result = "";
				if (chatbot == "creative") {
					result = await client.EdgeChatBot.ask(prompt, conversation_style.creative)

				}
				else if (chatbot == "balanced") {
					result = await client.EdgeChatBot.ask(prompt, conversation_style.balanced)

				}

				else if (chatbot == "precise") {
					result = await client.EdgeChatBot.ask(prompt, conversation_style.precise)

				}
				client.EdgeChatBot.close();
				resolve(result)
			}

		})
	}
	catch (error) {
		throw new Error(error);
	}
}

module.exports = {
	get_result: AI,
};