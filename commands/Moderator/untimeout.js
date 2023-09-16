const { CommandInteraction, EmbedBuilder } = require('discord.js')

module.exports = { untimeout_member }
/**
 * @param { CommandInteraction } interaction
 */

async function untimeout_member(client, interaction, user, target, reason) {

	try {
		const AuthorMember = interaction.guild.members.cache.find(member => member.id === user.id);
		const targetMember = interaction.guild.members.cache.find(member => member.id === target.id);

		if (AuthorMember.roles.highest.position > targetMember.roles.highest.position) {
			await targetMember.timeout(1, reason)

			return {
				code: 200,
				message: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields({
							name: `You have untimeouted ${targetMember.displayName}`,
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
						.setDescription(`Remove timeout a member in this server`)
						.setColor(client.get_color())
						.addFields({
							name: `You can't remove timeout ${targetMember.displayName}`,
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