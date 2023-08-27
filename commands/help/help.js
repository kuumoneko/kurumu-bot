const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, PermissionsBitField } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const map = require('collections/map.js')
const { aclient } = require('/kurumu-bot/src/aclient')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help for user from kurumu!')
		.addStringOption(command_help =>
			command_help.setName('command_helped')
				.setDescription('What command do you want to help?')),
	/**
	 * 
	 * @param {aclient} client 
	 * @param {CommandInteraction} interaction
	 */

	async execute(client, interaction) {
		await interaction.deferReply({
			ephemeral: true
		});

		const command_help = interaction.options.getString('command_helped') ?? 'None';
		const color = client.get_color();
		if (command_help == 'None') {

			var group_command = [];
			var commands = new map();
			// Grab all the command files from the commands directory you created earlier
			const foldersPath = path.join('/kurumu-bot', 'commands');
			const commandFolders = fs.readdirSync(foldersPath);

			for (const folder of commandFolders) {
				// Grab all the command files from the commands directory you created earlier
				const commandsPath = path.join(foldersPath, folder);
				const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

				group_command.push(folder)
				commands[folder] = []

				// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
				for (const file of commandFiles) {
					const filePath = path.join(commandsPath, file);
					const command = require(filePath);

					if ('data' in command && 'execute' in command) {
						commands[folder].push(command.data.toJSON());
					}
				}
			}



			var embeb = new EmbedBuilder();
			embeb.setTitle(`Auto help from Kurumu`);
			embeb.setDescription("Hello, may I help you?");
			embeb.setColor(color);
			embeb.setThumbnail(interaction.user.displayAvatarURL());


			for (const folder in commandFolders) {

				const group_command = commands[commandFolders[folder]]

				if (commandFolders[folder] == 'test')
					continue;

				var value = ''
				group_command.forEach(command => {
					value += "`" + `${command.name}` + "` ";
				})

				embeb.addFields({
					name: `${commandFolders[folder]}:`,
					value: value,
				});
			}

			await interaction.followUp({
				embeds: [embeb],
				ephemeral: true,
			})

		}
		else {
			const command = client.client.commands.get(command_help) ?? 'Not found';
			if (command === 'Not found') {
				await interaction.followUp({
					content: "Error: `404 Not Found`",
					ephemeral: true,

				});
				return;
			}
			const command_data = command.data;

			const def_perm = command_data.default_member_permissions ?? 0;
			var def_mem_perm_arr;

			if (def_perm !== 0) {
				const def_mem_perm = new PermissionsBitField(BigInt(Number(command_data.default_member_permissions)));
				def_mem_perm_arr = def_mem_perm.toArray();
			}
			else {
				def_mem_perm_arr = [`You don't need eny permission for this command`];
			}
			var permss = '';

			def_mem_perm_arr.forEach(perm => {
				permss += "`" + `${perm}` + "` ";
			})

			const command_name = command_data.name;
			const desc = command_data.description;
			const opts = command_data.options;


			var embebs = []

			embebs.push(new EmbedBuilder()
				.setTitle("Auto help from Kurumu for `" + `${command_name}` + "`")
				.setDescription(`Hello, May I help you?`)
				.setColor(color)
				.setThumbnail(interaction.user.displayAvatarURL())
				.addFields([
					{
						name: `Name:`,
						value: `> ${command_name}`,
					},
					{
						name: `Description:`,
						value: `> ${desc}`,
					},
					{
						name: `Permission:`,
						value: `> ${permss}`,
					},
					{
						name: `Options:`,
						value: `> ${opts.length}`
					}
				]))

			var embeb = new EmbedBuilder()
				.setTitle("Auto help from Kurumu for Options of`" + `${command_name}` + "`")
				.setColor(color)


			opts.forEach(opt => {
				embeb.addFields(
					{
						name: `${opt.name}:`,
						value: `> **Description**: ${opt.description}\n> **Require**: ${(opt.required == true) ? 'Yes' : 'No'}`,
					})
			})

			embebs.push(embeb)

			await interaction.followUp({
				embeds: embebs,
				ephemeral: true,
			});
			return;
		}

	},
};