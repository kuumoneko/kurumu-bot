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

		await get_result(interaction, prompt, chatbot);
	},
};
