const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { playing } = require('../../Commands/Music/support/playing');
const { play_music } = require('../../Commands/Music/play');

module.exports = {
    playing: playing,
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play music!')
        .addStringOption(prompt =>
            prompt.setName('prompt')
                .setDescription('link or query (multi by using `,`)'))
        .addBooleanOption(isshuffle =>
            isshuffle.setName('isshuffle')
                .setDescription('Do you want to shuffle the queue?'))
        .addStringOption(isloop =>
            isloop.setName('isloop')
                .setDescription('Chose your loop mode')
                .addChoices(
                    { name: 'Track', value: '1' },
                    { name: 'Queue', value: '2' },
                    { name: 'Autoplay', value: '3' },
                    { name: 'Disabled', value: '0' }
                ))
        .addStringOption(mode =>
            mode.setName('mode')
                .setDescription('set your search mode(only use for search query)')
                .addChoices(
                    { name: 'Youtube', value: "youtube" },
                    { name: 'Spotify', value: "spotify" },
                    { name: 'Soundcloud', value: "soundcloud" },
                )),

    /**
     *  
     * @param {CommandInteraction} interaction 
     */

    async execute(client, interaction) {
        await interaction.deferReply({
            ephemeral: true,
        })

        var prompts = interaction.options.getString('prompt') ?? undefined;
        const isloop = interaction.options.getString('isloop') ?? 'None';
        const shuffle = interaction.options.getBoolean('isshuffle');
        const mode = interaction.options.getString('mode') ?? 'None';

        const result = await play_music(client, interaction, prompts, isloop, shuffle, mode);

        await interaction.followUp({
            embeds: result.message,
            ephemeral: true
        });

        if (result.code === 200) {
            await playing(client, interaction);
        }
    }
};