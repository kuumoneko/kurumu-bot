const { Message } = require('discord.js');
const { get_result } = require('../../Commands/AI/ai');

/**
 * 
 * @param {Message} interaction
 * @param {string} isPrivate 
 */

async function ai(client, interaction, prompt, chatbot) {
	var result = await get_result(client, interaction, prompt, chatbot);

	try {

		var char_limit = 1900,
			res_mess = [],
			i = 0,
			res = "";

		var response = result;

		// response = response.split('}}')[1];

		if (response.length > char_limit) {
			var temp = response.split('\n');
			var length_temp = temp.length;

			while (i < length_temp - 1) {

				if (temp[i].indexOf('[Image ') == -1) {
					if ((res + temp[i]).length < char_limit) {
						res += temp[i] + '\n';
					}
					else {
						res_mess.push(res);
						res = temp[i] + '\n';
					}
				}
				i++;
			}

			res_mess.push(res);
			interaction.reply({
				content: `${res_mess[0]}`,
			})

			for (var i = 1; i < res_mess.length; i++) {
				interaction.reply({
					content: `${res_mess[i]}`,
				})
			}

		}
		else {
			interaction.reply({
				content: `${response}`,
			})
		}
	}
	catch (error) {
		console.error(error);
		await interaction.reply({
			content: `Something was wrong, please call my owner for help :<<`,
		})
	}
}

module.exports = {
	ai: ai,
}