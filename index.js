import {
  discordClient,
  ban_member,
  view_bans,
  chnick_member,
  chrole_member,
  deafen_member,
  kick_member,
  mute_member,
  timeout_member,
  undeafen_member,
  unmute_member,
  untimeout_member,
  move_member,
  // Music
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
  playing,
  // Ai
  get_result,
  // Ultility
  get_ping,
  get_status,
} from "discordpath-js";
import config from "./database/config.json" assert { type: "json" };
import { readdirSync } from "node:fs";
import { Collection, Events } from "discord.js";
import { REST, Routes } from "discord.js";
import { useMainPlayer } from "discord-player";
import _ from "lodash";

// import http from "http";
// import fs from "fs";

// const PORT = 5500;

// fs.readFile("./index.html", function (err, html) {
//   //If there is an error, throw it
//   if (err) throw err;

//   //Create a web server object and pass a callback function
//   http
//     .createServer(function (request, response) {
//       //Set the status code and the content type of the response
//       response.writeHeader(200, { "Content-Type": "text/html" });

//       //Write the HTML file contents to the response body
//       response.write(html);

//       //End the response
//       response.end();

//       console.log(`Running at http://localhost:${PORT}`);
//     })
//     .listen(PORT); //Make the server listen to the specified port
// });

const client = new discordClient({
  name: config.name,
  prefix: config.prefix,
  youtube_api_key: config.youtube,
  cookie_U: config.cookie_U,
  __Secure_1PSID: config.__Secure_1PSID,
  __Secure_1PSIDTS: config.__Secure_1PSIDTS,
  version: "v0.9.0",
});

async function search(promp, mode) {
  const player = useMainPlayer();
}

async function setup() {
  await client.setup();
}

setup();

const commands = [];

for (const file of readdirSync("./Commands")) {
  const command = await import(`./Commands/${file}`);
  if (command.data && command.execute) {
    commands.push(command.data);
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
      `Successfully reloaded ${data.length} pplication (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();

client.client.commands = new Collection();

for (const file of readdirSync("./Commands")) {
  const command = await import(`./Commands/${file}`);
  if (command.data && command.execute) {
    client.client.commands.set(command.data.name, command);
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

client.client.on("messageCreate", async (ctx) => {
  if (ctx.author.id === client.client.user.id) return;

  if (ctx.content.startsWith(client.prefix)) {
    var arg = ctx.content.split(" ");

    const command = arg[0].split(client.prefix)[1];
    var res = undefined;

    if (command === "chat") {
      const tempp = arg.slice(1, -1);
      const chatbot = arg[arg.length - 1];
      var prompt = "";

      tempp.forEach((str) => {
        prompt += str + " ";
      });
      const response = await get_result(client, ctx, prompt, chatbot);

      try {
        var char_limit = 1900,
          res_mess = [],
          i = 0;
        const res = "";

        if (response.length > char_limit) {
          var temp = response.split("\n");
          var length_temp = temp.length;

          while (i < length_temp - 1) {
            if (temp[i].indexOf("[Image ") == -1) {
              if ((res + temp[i]).length < char_limit) {
                res += temp[i] + "\n";
              } else {
                res_mess.push(res);
                res = temp[i] + "\n";
              }
            }
            i++;
          }

          res_mess.push(res);
          console.log(res_mess);
          for (const string in res_mess) {
            await ctx.reply({
              content: `${string}`,
              ephemeral: true,
            });
          }
        } else {
          await ctx.reply({
            content: `${response}`,
            ephemeral: true,
          });
        }
      } catch (error) {
        console.error(error);
        await ctx.reply({
          content: `Something was wrong, please call my owner for help :<<`,
          ephemeral: true,
        });
      }
    } else if (command === "join") {
      res = await join_voice(client, ctx);
    } else if (command === "leave") {
      res = await leave_voice(client, ctx);
    } else if (command === "nplay") {
      res = await now_playing(client, ctx);
    } else if (command === "pause") {
      res = await pausing(client, ctx);
    } else if (command === "resume") {
      res = await resuming(client, ctx);
    } else if (command === "queue") {
      res = await see_queue(client, ctx);
    } else if (command === "setloop") {
      res = await set_loop(client, ctx, arg[1]);
    } else if (command === "shuffle") {
      res = await shuffling(client, ctx);
    } else if (command === "skip") {
      res = await skipping(client, ctx);
    } else if (command === "stop") {
      res = await stopping(client, ctx);
    } else if (command === "ping") {
      res = await get_ping(client, ctx);
    } else if (command === "status") {
      res = await get_status(client, ctx);
    }

    // else if (command === "help") {
    //   res = await help(client, ctx, arg[1] || "None");
    // }
    else if (command === "play") {
      var argss1 = arg.slice(arg.length - 4);

      var argss = [];
      argss1.forEach((a) => {
        argss.push(a.toLowerCase());
      });

      var prompts = "",
        isloop = "None",
        mode = "None",
        shuffle = "None";

      const check_loop = {
        track: "1",
        queue: "2",
        autoplay: "3",
        disabled: "0",
      };

      const check_mode = {
        youtube: "youtube",
        spotify: "spotify",
        soundclound: "soundclound",
      };

      const check_shuffle = {
        true: true,
        false: false,
      };

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
      temp.forEach((str) => {
        prompts += str + " ";
      });

      res = await play_music(client, ctx, prompts, isloop, shuffle, mode);
    }

    if (res !== undefined) {
      await ctx.reply({
        embeds: res,
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
