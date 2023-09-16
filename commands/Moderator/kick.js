const { CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = { kick_member }
/**
 * 
 * 
 * @param {CommandInteraction} interaction
 */

async function kick_member(client, interaction, user, target, reason) {

	try {
		var Target = interaction.guild.members.cache.find(member => member.id === target.id);
		var user = interaction.guild.members.cache.find(member => member.id === user.id);

		if (user.roles.highest.position > Target.roles.highest.position) {
			Target.kick({
				reason: reason,
			})

			return {
				code: 200,
				message: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields(
							{
								name: `You have kicked ${Target.displayName} `,
								value: `Reason: ${reason}`,
							}
						)
				],
			}
		}
		else {
			return {
				code: 404,
				message: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields(
							{
								name: `You can't kick ${Target.displayName} `,
								value: `Error: Missing permission`,
							}
						)
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