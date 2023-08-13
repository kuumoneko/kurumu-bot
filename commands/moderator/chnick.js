const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chnick')
		.setDescription('Change nickname for a member!')
		.addUserOption(member =>
			member.setName('member')
			.setDescription('Who do you want to call?')
			.setRequired(true))
		.addStringOption(nick =>
			nick.setName('nick')
			.setDescription('what nick you want to change?'))
			
		.setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)	
			,

	/**
	 * 
	 * @param {Client} client
	 * @param {CommandInteraction} interaction 
	 */
			
	async execute(client , interaction) {	

		const mb = interaction.options.getUser('member');
		const nick = interaction.options.getString('nick') ?? "";

		// console.log(nick);

		var Target = interaction.guild.members.cache.find(member => member.id === mb.id);
		var user = interaction.guild.members.cache.find(member => member.id === interaction.user.id);
		var clientt = interaction.guild.members.cache.find(member => member.id === client.user.id);

		if (clientt.roles.highest.position <= Target.roles.highest.position)
		{
			await interaction.reply(`I can't do this action :<`);
			return
		}

		if (user == Target)
		{
			Target.edit({
				nick : nick,
			});
			await interaction.reply({
				content : 'Done',
				'ephemeral' : true,
			})
			return;
		}
		
		else if (user.roles.highest.position > Target.roles.highest.position && user.permissions.has(PermissionFlagsBits.ManageNicknames) == true)
		{
			Target.edit({
				nick : nick,
			});
			await interaction.reply({
				content : 'Done',
				'ephemeral' : true,
			})
			return;
		}


		else{
			await interaction.reply(`You can't do this action :<`);
		}
		
	},
};