const { PermissionFlagsBits, CommandInteraction, SlashCommandBuilder } = require('discord.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('untimeout')
		.setDescription('Untimeout a  member!')
		.addUserOption(option =>
			option.setName('member')
			.setDescription('Who do you want to call?')
			.setRequired(true))

		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	/**
	 * 
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
			
	async execute(client , interaction) {	
		var mb = interaction.options.getUser('member');

		const AuthorMember = interaction.guild.members.cache.find(member => member.id === interaction.user.id)
		const targetMember = interaction.guild.members.cache.find(member => member.id === mb.id)


		if (AuthorMember.roles.highest.position <= targetMember.roles.highest.position)
		{
			await interaction.reply(`You can't do this :))`)
			return
		}
		const reason = "None"

		await TargetMember.timeout(1 , reason)

		await interaction.reply(`${mb} has been untimeouted by ${interaction.user}`);
	},
};