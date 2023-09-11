const { join_voice } = require('../../Commands/Music/join');

module.exports = {
	joinn
}

async function joinn(client, interaction) {
	const joinn = await join_voice(client, interaction);

	if (joinn.code === 200) {
		await interaction.reply({
			embeds: joinn.message
		});
	}
	else if (joinn.code === 500) {
		await interaction.reply({
			embeds: joinn.message
		});
	}
	else {
		await interaction.reply({
			embeds: joinn.message
		});
	}
}