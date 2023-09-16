const { CommandInteraction, EmbedBuilder } = require('discord.js')

module.exports = { timeout_member }


/**
 * 
 * @param {string} value 
 * @param {CommandInteraction} interaction
 */

async function timeout_member(client, interaction, user, target, time, value, reason) {

	try {
		const AuthorMember = interaction.guild.members.cache.find(member => member.id === user.id)
		const targetMember = interaction.guild.members.cache.find(member => member.id === target.id)

		if (AuthorMember.roles.highest.position > targetMember.roles.highest.position) {

			var temp;

			switch (value) {
				case 'Seconds':
					temp = time;
					break;
				case 'Minutes':
					temp = time * 60;
					break;
				case 'Hours':
					temp = time * 60 * 60;
					break;
				case 'Days':
					temp = time * 60 * 60 * 24;
					break;
				case 'Weeks':
					temp = time * 60 * 60 * 24 * 7;
					break;
				default:
					temp = 0;
					break;
			}


			await targetMember.timeout(temp * 1000, reason)

			return {
				code: 200,
				message: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields({
							name: `You have timeouted ${targetMember.displayName} in ${time} ${value.toLowerCase()}`,
							value: `Reason: ${reason}`,
						})
				],
			}
		}
		else {
			return {
				code: 404,
				message: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields({
							name: `You can't timeout ${targetMember.displayName}`,
							value: `Error: Missing permission`,
						})
				],
			}

		}
	}
	catch (e) {
		return {
			code: 500,
			message: [
				new EmbedBuilder()
					.setColor(client.get_color())
					.addFields({
						name: `You can't do this action`,
						value: `Error: ${e}`
					})
			]
		}
	}
}