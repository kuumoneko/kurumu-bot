const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");
const {
  discordClient,
  join_voice,
  leave_voice,
  now_playing,
  pausing,
  play_music,
  see_queue,
  resuming,
  set_loop,
  shuffling,
  skipping,
  stopping,
} = require("discordpath-js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Play and chill~")
    .addSubcommand((scm) =>
      scm.setName("join").setDescription("Join the your voice channel!")
    )
    .addSubcommand((scm) =>
      scm.setName("leave").setDescription("Leave current voice channel!")
    )
    .addSubcommand((scm) =>
      scm.setName("nplay").setDescription("Show current track")
    )
    .addSubcommand((scm) => scm.setName("pause").setDescription("Pause play!"))
    .addSubcommand((scm) =>
      scm
        .setName("play")
        .setDescription("Play music!")
        .addStringOption((prompt) =>
          prompt
            .setName("prompt")
            .setDescription("link or query (multi by using `,`)")
        )
        .addBooleanOption((isshuffle) =>
          isshuffle
            .setName("isshuffle")
            .setDescription("Do you want to shuffle the queue?")
        )
        .addStringOption((isloop) =>
          isloop
            .setName("isloop")
            .setDescription("Chose your loop mode")
            .addChoices(
              { name: "Track", value: "1" },
              { name: "Queue", value: "2" },
              { name: "Autoplay", value: "3" },
              { name: "Disabled", value: "0" }
            )
        )
        .addStringOption((mode) =>
          mode
            .setName("mode")
            .setDescription("set your search mode(only use for search query)")
            .addChoices(
              { name: "Youtube", value: "youtube" },
              { name: "Spotify", value: "spotify" },
              { name: "Soundcloud", value: "soundcloud" }
            )
        )
    )
    .addSubcommand((scm) =>
      scm
        .setName("queue")
        .setDescription("See the queue or make change tracks!")
    )
    .addSubcommand((scm) =>
      scm.setName("resume").setDescription("Resume play!")
    )
    .addSubcommand((scm) =>
      scm
        .setName("setloop")
        .setDescription("set repeat for your queue")
        .addStringOption((mode) =>
          mode
            .setName("mode")
            .setDescription("Chose your loop mode")
            .setRequired(true)
            .addChoices(
              { name: "Track", value: "1" },
              { name: "Queue", value: "2" },
              { name: "Autoplay", value: "3" },
              { name: "Disabled", value: "0" }
            )
        )
    )
    .addSubcommand((scm) =>
      scm.setName("shuffle").setDescription("Shuffle the track!")
    )
    .addSubcommand((scm) =>
      scm.setName("skip").setDescription("Play the next track!")
    )
    .addSubcommand((scm) =>
      scm.setName("stop").setDescription("Stop play and leave!")
    ),

  /**
   *
   * @param {discordClient} client
   * @param {CommandInteraction} interaction
   */
  async execute(client, interaction) {
    await interaction.deferReply({
      ephemeral: true,
    });

    const scm = interaction.options.getSubcommand();

    var result = "";

    if (scm === "join") {
      result = await join_voice(client, interaction);
    } else if (scm === "leave") {
      result = await leave_voice(client, interaction);
    } else if (scm === "nplay") {
      result = await now_playing(client, interaction);
    } else if (scm === "pause") {
      result = await pausing(client, interaction);
    } else if (scm === "play") {
      var prompts = interaction.options.getString("prompt") ?? undefined;
      const isloop = interaction.options.getString("isloop") ?? "None";
      const shuffle = interaction.options.getBoolean("isshuffle");
      const mode = interaction.options.getString("mode") ?? "None";

      await play_music(
        client,
        interaction,
        prompts,
        isloop,
        shuffle,
        mode
      ).then((data) => {
        result = data;
      });
    } else if (scm === "queue") {
      await see_queue(client, interaction);
    } else if (scm === "resume") {
      result = await resuming(client, interaction);
    } else if (scm === "setloop") {
      const mode = interaction.options.getString("mode");
      result = await set_loop(client, interaction, mode);
    } else if (scm === "shuffle") {
      result = await shuffling(client, interaction);
    } else if (scm === "skip") {
      result = await skipping(client, interaction);
    } else if (scm === "stop") {
      result = await stopping(client, interaction);
    }

    if (result !== "") {
      await interaction.followUp({
        embeds: result,
        ephemeral: true,
      });
    }
  },
};
