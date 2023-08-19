const { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction, Client } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const {add_to_queue} = require('./add_to_queue/__add_to_queue__')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play music!')
		.addStringOption(prompt =>
			prompt.setName('prompt')
				.setDescription('Youtube link or search on Youtube'))
		.addBooleanOption(isloop =>
			isloop.setName('isloop')
				.setDescription('Do you want to repeat your track?'))
		.addStringOption(shuffle =>
			shuffle.setName('shuffle')
				.setDescription('What mode you want to shuffle or None')),

	/**
	 * 
	 * 
	 * @param {CommandInteraction} interaction 
	 */

  async execute(client, interaction) {
    await interaction.deferReply({
      ephemeral : true,
    })
    const prompt = interaction.options.getString('prompt');
    const isloop = interaction.options.getBoolean('isloop');
    const shuffle = interaction.options.getString('shuffle');

    await add_to_queue(client , interaction  , prompt)

		await interaction.followUp('This is play command:)))) updating....');
	},
};

/**
 * 
 
// Require the necessary packages and modules
const Discord = require ('discord.js');
const ytdl = require ('ytdl-core');
const ffmpeg = require ('ffmpeg');

// Create a new Discord client
const client = new Discord.Client ();

// Define a prefix for the bot commands
const prefix = '!';

// Log in the bot using your token
client.login ('your-token-here');

// Listen for ready event
client.on ('ready', () => {
  console.log (`Logged in as ${client.user.tag}!`);
});

// Listen for message event
client.on ('message', async message => {
  // Ignore messages that are not commands or from other bots
  if (!message.content.startsWith (prefix) || message.author.bot) return;

  // Split the message into arguments
  const args = message.content.slice (prefix.length).trim ().split (/ +/);
  // Get the first argument as the command name
  const command = args.shift ().toLowerCase ();

  // Handle the play command
  if (command === 'play') {
    // Check if the user provided a valid YouTube URL
    if (!ytdl.validateURL (args [0])) {
      return message.channel.send ('Please provide a valid YouTube URL.');
    }

    // Check if the user is in a voice channel
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send ('You need to be in a voice channel to play music.');
    }

    // Check if the bot has permission to join and speak in the voice channel
    const permissions = voiceChannel.permissionsFor (message.client.user);
    if (!permissions.has ('CONNECT') || !permissions.has ('SPEAK')) {
      return message.channel.send ('I need permission to join and speak in your voice channel.');
    }

    // Try to join the voice channel and get the connection
    try {
      var connection = await voiceChannel.join ();
    } catch (error) {
      console.error (`Could not join voice channel: ${error}`);
      return message.channel.send (`Could not join voice channel: ${error}`);
    }

    // Stream the audio from YouTube using ytdl
    const stream = ytdl (args [0], {filter: 'audioonly'});
    // Create a dispatcher to play the stream
    const dispatcher = connection.play (stream);

    // Handle the finish event
    dispatcher.on ('finish', () => {
      // Leave the voice channel
      voiceChannel.leave ();
      // Send a message to the text channel
      message.channel.send ('Finished playing!');
    });

    // Handle the error event
    dispatcher.on ('error', error => {
      console.error (error);
      // Send a message to the text channel
      message.channel.send (`An error occurred: ${error}`);
    });

    // Send a message to the text channel
    message.channel.send (`Now playing: ${args [0]}`);
  }
});

 */