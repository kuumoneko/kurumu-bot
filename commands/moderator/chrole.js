const { SlashCommandBuilder, Client, CommandInteraction, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chrole')
		.setDescription('Change role for a member!')
		.addUserOption(member =>
			member.setName('member')
			.setDescription('Who do you want to call?')
			.setRequired(true))
		.addRoleOption(role =>
			role.setName('role')
			.setDescription('What role you want to change?'))
		.setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname),
			
	/**
	 * 
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
			
	async execute(client , interaction) {

		const mb = interaction.options.getUser('member');
		const rl = interaction.options.getRole('role');
		
		var Target = interaction.guild.members.cache.find(member => member.id === mb.id);
		var user = interaction.guild.members.cache.find(member => member.id === interaction.user.id);
		var clientt = interaction.guild.members.cache.find(member => member.id === client.user.id);

		// console.log(`${clientt.roles.highest.position > Target.roles.highest.position}`)

		if (clientt.roles.highest.position <= Target.roles.highest.position)
		{
			await interaction.reply(`I can't do this action :<`)
			return;
		}

		var rolee = interaction.guild.roles.cache.find(role => role.name === rl.name)

		if (user.roles.highest.position > Target.roles.highest.position)
		{
			// console.log(Target.roles.cache.find(role => role.id === rolee.id))
			if (Target.roles.cache.find(role => role.id === rolee.id) === undefined)
				Target.roles.add(rolee)
			else
				Target.roles.remove(rolee)

			await interaction.reply({
				content : `Done`,
				ephemeral : true,
			})

			return 
		}


		await interaction.reply(`You can't do this action :<`)

		// await interaction.reply('This is chrole command:)))) updating....');
	},
};