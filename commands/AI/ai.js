const { CommandInteraction, Message } = require('discord.js');
const { Getresponse } = require('./chatbot');
const aclient = require('../../src/aclient');

/**
 * 
 * @param {CommandInteraction} interaction 
 * @param {Message} interaction
 * @param {string} prompt 
 * @param {string} chatbot 
 */
async function AI(interaction, prompt, chatbot) {
	try {
		if (interaction.deferred === true) {

			const result = await Getresponse(prompt, chatbot.toLowerCase());
			await chat_slash(interaction, result);
		}
		else {
			const result = await Getresponse(prompt, chatbot.toLowerCase());
			await chat_prefix(interaction, result);
		}
	}
	catch (error) {
		throw new Error(error);
	}
}

module.exports = {
	get_result: AI,
};


/**
 * 
 * @param {aclient} client 
 * @param {CommandInteraction} interaction 
 * @param {string} prompt 
 * @param {boolean} isPrivate 
 * @param {string} chatbot 
 */

async function chat_slash(interaction, result) {


	try {

		var char_limit = 1900,
			res_mess = [],
			i = 0,
			res = "";

		var response = result;

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
			res_mess.forEach((string) => {
				interaction.followUp({
					content: `${string}`,
					ephemeral: true,
				})

			})

		}
		else {
			interaction.followUp({
				content: `${response}`,
				ephemeral: true,
			})
		}
	}

	catch (error) {
		console.error(error);
		await interaction.followUp({
			content: `Something was wrong, please call my owner for help :<<`,
			ephemeral: true,
		})
	}
}

/**
 * 
 * @param {aclient} client 
 * @param {CommandInteraction} interaction 
 * @param {string} prompt 
 * @param {string} chatbot 
 */

async function chat_prefix(interaction, result) {


	try {

		var char_limit = 1900,
			res_mess = [],
			i = 0,
			res = "";

		var response = result;

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
		await interaction.editReply({
			content: `Something was wrong, please call my owner for help :<<`,
		})
	}
}