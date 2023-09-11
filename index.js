const fs = require('node:fs');
const path = require('node:path');
const { Collection, Events } = require('discord.js');
const aclient = require('./src/aclient.js');
const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./database/config.json');

const _ = require('lodash')

const { SpotifyExtractor, YouTubeExtractor, SoundCloudExtractor } = require('@discord-player/extractor');

const { ai, joinn, leavee, nplayy, pause_music, resume_prefix, queue_prefix, setloop_prefix,
	skip_prefix, stop_prefix, ping_prefix, status_prefix, help_prefix, play_prefix, shuffle_prefix } = require('./Prefix_commands/index.js')

const kclient = new aclient()

async function check(client) {
	await client.player.extractors.loadDefault();
	await client.player.extractors.register(SpotifyExtractor, {});
	await client.player.extractors.register(SoundCloudExtractor, {});
	await client.player.extractors.register(YouTubeExtractor, {});
}

check(kclient)

const commands = [];
const foldersPath = path.join(__dirname, 'Slash_commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

kclient.client.commands = new Collection();

const commandsPath = path.join(__dirname, 'Slash_commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		kclient.client.commands.set(command.data.name, command);
		console.log(command.data.name);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const Pathh = path.join(__dirname, 'Slash_commands');
const Folderss = fs.readdirSync(Pathh);

for (const folder of Folderss) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			kclient.client.commands.set(command.data.name, command)
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

kclient.client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(kclient, interaction);
	} catch (error) {
		console.error(error);
		console.log(interaction.commandName)
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

kclient.client.on('messageCreate', async (ctx) => {
	if (ctx.author.id === kclient.client.user.id)
		return;

	if ((ctx.content.startsWith(kclient.prefix))) {
		var arg = ctx.content.split(' ')

		const command = arg[0].split(kclient.prefix)[1];

		if (command === 'chat') {
			const temp = arg.slice(1, -1);
			const chatbot = arg[arg.length - 1];
			var prompt = "";

			temp.forEach(str => {
				prompt += str + ' '
			})
			await ai(ctx, prompt, chatbot);
		}

		if (command === 'join') {
			await joinn(kclient, ctx);
		}

		if (command === 'leave') {
			await leavee(kclient, ctx);
		}

		if (command === 'nplay') {
			await nplayy(kclient, ctx);
		}

		if (command === 'pause') {
			await pause_music(kclient, ctx);
		}

		if (command === 'resume') {
			await resume_prefix(kclient, ctx);
		}

		if (command === 'queue') {
			await queue_prefix(kclient, ctx);
		}

		if (command === 'setloop') {
			await setloop_prefix(kclient, ctx, arg[1]);
		}

		if (command === 'shuffle') {
			await shuffle_prefix(kclient, ctx);
		}

		if (command === 'skip') {
			await skip_prefix(kclient, ctx);
		}

		if (command === 'stop') {
			await stop_prefix(kclient, ctx);
		}

		if (command === 'ping') {
			await ping_prefix(kclient, ctx);
		}

		if (command === 'status') {
			await status_prefix(kclient, ctx);
		}

		if (command === 'help') {
			await help_prefix(kclient, ctx, arg[1] || 'None');
		}

		if (command === 'play') {
			var argss1 = arg.slice(arg.length - 4);

			var argss = []
			argss1.forEach(a => {
				argss.push(a.toLowerCase())
			})

			var prompts = '', isloop = 'None', mode = 'None', shuffle = 'None';

			const check_loop = {
				'track': '1',
				'queue': '2',
				'autoplay': '3',
				'disabled': '0'
			}

			const check_mode = {
				'youtube': 'youtube',
				'spotify': 'spotify',
				'soundclound': 'soundclound',
			}

			const check_shuffle = {
				'true': true,
				'false': false,
			}

			var moi = 2 ^ 53;

			argss.forEach((arrgg, index) => {
				if (_.get(check_loop, arrgg, undefined) !== undefined) {
					isloop = check_loop[arrgg];

					moi = Math.min(moi, index + arg.length - 4);
				}
			});

			argss.forEach((arrgg, index) => {
				if (_.get(check_mode, arrgg, undefined) !== undefined) {
					mode = check_mode[arrgg];


					moi = Math.min(moi, index + arg.length - 4);
				}
			});

			argss.forEach((arrgg, index) => {
				if (_.get(check_shuffle, arrgg, undefined) !== undefined) {
					shuffle = check_shuffle[arrgg];

					moi = Math.min(moi, index + arg.length - 4);
				}
			});

			const temp = arg.slice(1, moi);
			temp.forEach(str => {
				prompts += str + ' '
			})

			await play_prefix(kclient, ctx, prompts, isloop, shuffle, mode);
		}

	}
})


kclient.client.on("ready", () => {
	console.log(`[Warning] Make sure that you have updated BingAI and Bard cookies`)
	console.log(`if you don't update cookies, you can have some error when running`)
	console.log(`Recommend updating cookies cookies before running bot:>`)
	console.log(`Logged in as ${kclient.client.user.tag}!`)
})

// Log in to Discord with your kclient.client's token

kclient.client.login(token);