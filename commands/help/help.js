const { CommandInteraction, EmbedBuilder, PermissionsBitField } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const map = require('collections/map.js')
const { aclient } = require('/kurumu-bot/src/aclient')

module.exports = { helping }
/**
 * 
 * @param {aclient} client 
 * @param {CommandInteraction} interaction
 */
async function helping(client, interaction, command_help) {

	var user;

	if (interaction.deferred) {
		user = interaction.user
	}
	else {
		user = interaction.author
	}

	const color = client.get_color();

	if (command_help == 'None') {

		var group_command = [];
		var commands = new map();
		// Grab all the command files from the commands directory you created earlier
		const foldersPath = path.join('/kurumu-bot', 'Slash_commands');
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
		embeb.setThumbnail(user.displayAvatarURL());


		for (const folder in commandFolders) {

			const group_command = commands[commandFolders[Number(folder)]]

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

		return {
			code: 200,
			message: [embeb]
		}

	}
	else {
		const command = client.client.commands.get(command_help) ?? 'Not found';
		if (command === 'Not found') {
			return {
				code: 404,
				message: [
					new EmbedBuilder()
						.setColor(client.get_color())
						.addFields({
							name: `Error:`,
							value: `404 Not Found`
						})
				],
			};
		}
		const command_data = command.data;

		const def_perm = command_data.default_member_permissions ?? 0;
		var def_mem_perm_arr;

		if (def_perm !== 0) {
			const def_mem_perm = new PermissionsBitField(BigInt(Number(command_data.default_member_permissions)));
			def_mem_perm_arr = def_mem_perm.toArray();
		}
		else {
			def_mem_perm_arr = [`You don't need any permission for this command`];
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
			.setThumbnail(user.displayAvatarURL())
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


		opts.forEach(
			/**
			 * @param {} opt 
			 */
			function (opt) {
				var temp = Object.getPrototypeOf(opt).constructor.name
				temp = temp.replace('SlashCommand', '')
				temp = temp.replace('Option', '')

				var embeb = new EmbedBuilder()
					.setTitle("Option: `" + `${opt.name}` + "`")
					.setColor(color)
					.addFields([
						{
							name: `Description:`,
							value: `${opt.description}`,
						},
						{
							name: `Type:`,
							value: `${temp}`
						},
						{
							name: `Required:`,
							value: (opt.required) ? 'true' : 'false'
						}
					])

				if (opt.choices != undefined) {
					var temp = '';
					opt.choices.forEach(choice => {
						temp += choice.name + '\n';
					})

					embeb.addFields({
						name: `Choices:`,
						value: temp,
					});
				}

				embebs.push(embeb)
			})

		return {
			code: 200,
			message: embebs,
		}
	}

}