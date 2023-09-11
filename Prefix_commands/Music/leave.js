const {  CommandInteraction } = require('discord.js');
const vocie = require('@discordjs/voice');
const { leave_voice } = require('../../Commands/Music/leave');

module.exports = {
	leavee
};
/**
 * 
 * 
 * @param {CommandInteraction} interaction 
*/


async function leavee(client, interaction) {
	const lea = await leave_voice(client, interaction);

	if (lea.code === 200) {
		await interaction.reply({
			embeds: lea.message
		});
	}
	else if (lea.code === 500) {
		await interaction.reply({
			embeds: lea.message
		});
	}
	else {
		await interaction.reply({
			embeds: lea.message
		});
	}

}