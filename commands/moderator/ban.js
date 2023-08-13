
const { PermissionFlagsBits, CommandInteraction, SlashCommandBuilder } = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member!')

		.addUserOption(member =>
			member.setName('member')
			.setDescription('Who do you want to call?')
			.setRequired(true))

		.addStringOption(reason =>
			reason.setName('reason')
			.setDescription('Why you want to do to that?'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	/**
	 * 
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
			
	async execute(client , interaction) {	
		const mb = interaction.options.getUser('member')
		const reason = interaction.options.getString('reason')

		const AuthorMember = interaction.guild.members.cache.find(member => member.id === interaction.user.id)
		const targetMember = interaction.guild.members.cache.find(member => member.id === mb.id)


		if (AuthorMember.roles.highest.position <= targetMember.roles.highest.position)
		{
			await interaction.reply(`You can't do this :))`)
			return
		}

	    await TargetMember.ban({reason: reason})


		await interaction.reply('This is Ban command:)))) updating....');
	},
};