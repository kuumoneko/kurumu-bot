const { SlashCommandBuilder, Client, CommandInteraction } = require('discord.js');
const { spawn } = require('child_process');
const { Getresponse } = require('../AI/chatbot.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('hat with chat bot!')

		.addStringOption(option1 =>
			option1.setName('prompt')
				.setDescription('What do you want to ask')
				.setRequired(true))

		.addBooleanOption(option2 =>
			option2.setName('isprivate')
				.setDescription('Do you want to ask private?')
				.setRequired(true))

		.addStringOption(option3 =>
			option3.setName('chatbot')
				.setDescription('What chatbot you want to ask?')
				.setRequired(true)
				.addChoices(
					{ name: 'Bing AI Creative', value: 'Creative' },
					{ name: 'Bing AI Balanced', value: 'Balanced' },
					{ name: 'Bing AI Precise', value: 'Precise' },
					{ name: 'Google Bard', value: 'Bard' },
				)

		),
	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {
		// const 
		const prompt = interaction.options.getString('prompt')
		const isPrivate = interaction.options.getBoolean('isprivate');
		const chatbot = interaction.options.getString('chatbot');

		await interaction.deferReply({
			ephemeral: isPrivate,

		})

		try {
			// Run a Python file called script.py and await its output
			const result = await Getresponse(prompt, chatbot);
			// Print the result
			// console.log(result);

			await new Promise((resolve) => setTimeout(resolve, 3000));

			// await interaction.editReply(`${result}`);

			var char_limit = 1900,
				res_length = 0,
				res_mess = [],
				i = 0,
				res = "";

			var response = result;

			// console.log()

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
				res_mess.forEach((string, index) => {
					// console.log(string)
					interaction.followUp({
						content: `${string}`,
						ephemeral: isPrivate,
					})

				})

			}
			else {
				interaction.followUp({
					content: `${response}`,
					ephemeral: isPrivate,
				})
			}

		}
		catch (error) {
			// Handle any errors
			console.error(error);
			await interaction.editReply({
				content: `Something was wrong, please call my owner for help :<<`,
				ephemeral: true,
			})
		}





	},
};