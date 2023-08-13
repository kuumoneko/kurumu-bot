const { SlashCommandBuilder, Client, CommandInteraction } = require('discord.js');

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
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
			
	async execute(client , interaction) {	
		// const prompt = interaction.options.get
		await interaction.reply('This is chat command:)))) updating...');
	},
};