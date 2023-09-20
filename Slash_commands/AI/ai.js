const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { get_result } = require('/kurumu-bot/Commands/AI/ai')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('hat with chat bot!')

		.addStringOption(option1 =>
			option1.setName('prompt')
				.setDescription('What do you want to ask')
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
		const prompt = interaction.options.getString('prompt')
		const chatbot = interaction.options.getString('chatbot');
		await interaction.deferReply({
			ephemeral: true,
		})
		var result = await get_result(client, interaction, prompt, chatbot.toLowerCase());

		try {

			var char_limit = 1900,
				res_mess = [],
				i = 0,
				res = "";

			var response = result;
			// var b = "";
			// if (b.indexOf('}}') != -1) {
			// 	response = response.split('}}')[1];
			// }
			// var a = response.split('}}');
			

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
	},
};
