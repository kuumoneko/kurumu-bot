const { PermissionFlagsBits, CommandInteraction, SlashCommandBuilder } = require('discord.js')

const { type } = require('os');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeout a member!')

		.addUserOption(option =>
			option.setName('member')
			.setDescription('Who do you want to call?')
			.setRequired(true))

		.addIntegerOption(option =>
			option.setName('time')
			.setRequired(true)
			.setDescription('How long you want to timeout?'))	
		.addStringOption(option =>
			option.setName('value')
			.setDescription('Time Unit')
			.setRequired(true)
			.addChoices(
				{name: 'Seconds' , value : 'Seconds'},
				{name: 'Minutes' , value : 'Minutes'},
				{name: 'Hours' , value : 'Hours'},
				{name: 'Days' , value : 'Days'},
				{name: 'Weeks' , value : 'Weeks'},
			))

		.addStringOption(option =>
			option.setName('reason')
			.setDescription('Why you want to do to that?'))

		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
		

	/**
	 * 
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
			
	async execute(client , interaction) {	
		var mb = interaction.options.getUser('member');
		var time = interaction.options.getInteger('time');
		var value = interaction.options.getString('value');
		var reason = interaction.options.getString('reason') ?? 'None';
		let temp = 0;




		const AuthorMember = interaction.guild.members.cache.find(member => member.id === interaction.user.id)
		const targetMember = interaction.guild.members.cache.find(member => member.id === mb.id)


		if (AuthorMember.roles.highest.position <= targetMember.roles.highest.position)
		{
			await interaction.reply(`You can't do this :))`)
			return
		}

		if (value == 'Seconds')
		{
			temp += time;
		}
		else if (value == 'Minutes')
		{
			temp += time * 60;
		}
		else if (value == 'Hours')
		{
			temp += time * 60 * 60;
		}
		else if (value == 'Days')
		{
			temp += time * 60 * 60 * 24;
		}
		else
		{
			temp += time * 60 * 60 * 24 *7;
		}


	  	await targetMember.timeout(temp * 1000 ,reason )
		
		return await interaction.reply(`${mb} has been timeouted by ${interaction.user} in ${time} ${value} with reason: ${reason}`);
	},
};