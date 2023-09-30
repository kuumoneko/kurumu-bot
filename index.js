const { discordClient } = require("discordpath-js");
const config = require("./database/config.json");

const fs = require("node:fs");
const path = require("node:path");
const { Collection, Events } = require("discord.js");
const { REST, Routes } = require("discord.js");

const client = new discordClient({
  name: config.name,
  youtube_api_key: config.YOUTUBE_API_KEY,
  cookie_U: config.cookie_U,
  __Secure_1PSID: config.__Secure_1PSID,
  __Secure_1PSIDTS: config.__Secure_1PSIDTS,
  version: "v0.9.0",
});

async function setup() {
  await client.setup();
}

setup();

const commands = [];

const commands_path = path.join(__dirname, "Commands");
const commands_files = fs
  .readdirSync(commands_path)
  .filter((file) => file.endsWith(".js"));

for (const file of commands_files) {
  const filePath = path.join(commands_path, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

const rest = new REST().setToken(config.token);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(Routes.applicationCommands(config.clientId), {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();

client.client.commands = new Collection();

const commandsPath = path.join(__dirname, "Commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    console.log(interaction.commandName);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});
client.client.on("ready", () => {
  console.log(
    `[Warning] Make sure that you have updated BingAI and Bard cookies`
  );
  console.log(
    `if you don't update cookies, you can have some error when running`
  );
  console.log(`Recommend updating cookies cookies before running bot:>`);
  console.log(`Logged in as ${client.client.user.tag}!`);
});

// Log in to Discord with your client.client's token

client.client.login(config.token);
