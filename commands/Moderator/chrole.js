const { CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = { chrole_member }

/**
 * 
 * 
 * @param {CommandInteraction} interaction
 */

async function chrole_member(client, interaction, user, target, role) {

	var Target = interaction.guild.members.cache.find(member => member.id === target.id);
	var user = interaction.guild.members.cache.find(member => member.id === user.id);
	var rolee = interaction.guild.roles.cache.find(roles => roles.name === role.name);

	try {
		if (user.roles.highest.position > Target.roles.highest.position && user.permissions.has(PermissionFlagsBits.ManageNicknames) == true && interaction.guild.roles.cache.find(role => role.name === rolee.name) !== undefined) {

			if (Target.roles.cache.find(role => role.id === rolee.id) === undefined)
				Target.roles.add(rolee);
			else
				Target.roles.remove(rolee);

			return {
				code: 200,
				message: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields(
							{
								name: `You have changed role of ${Target.nickname} in role ${rolee.name}`,
								value: 'Successfully changed',
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
								name: `You can't do that activity:<`,
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