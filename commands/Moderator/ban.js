const { CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = { ban_member }

/**
 * 
 * @param {CommandInteraction} interaction
 */

async function ban_member(client, interaction, user, target, reason) {

	const AuthorMember = interaction.guild.members.cache.find(member => member.id === user.id);
	const targetMember = interaction.guild.members.cache.find(member => member.id === target.id);

	try {
		if (AuthorMember.roles.highest.position > targetMember.roles.highest.position) {

			await targetMember.ban({ reason: reason });

			return {
				code: 200,
				message: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields({
							name: `Yes, you have banned ${AuthorMember.nickname}`,
							value: `Reason: ${reason}`
						})
				],
			}
		}
		else {
			return {
				code: 500,
				message: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields({
							name: `You can't do this action`,
							value: `Error: Missing permission`
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



