import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { captureException } from "@sentry/node";
import { ChatInputCommand } from "../../interfaces";

const command: ChatInputCommand = {
  requireGuild: true,
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("A list of every command")
    .setDMPermission(false)
    .setDescriptionLocalizations({
      de: "Zeigt eine Liste aller Befehle an",
      "es-ES": "Muestra una lista de cada comando",
      fr: "Affiche une liste de toutes les commandes",
    }),
  /**
   * @param {CommandInteraction} interaction
   * @param {WouldYou} client
   * @param {guildModel} guildDb
   */
  execute: async (interaction, client, guildDb) => {
    const helpembed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setDescription(
        `## What is Would You? \n\n **Would You** is a bot that allows you to play the game 'Would You Rather' with your friends on Discord. \n## Main Game Modes \n The game modes of  ** <:roundyou:1009964111045607525> Would You** include </wouldyourather:1099463656124723305>, </neverhaveiever:1099463656124723303>, </whatwouldyoudo:1199732399270023310>, </higherlower:1153718305903890554> and last but not least there is </truth:1169062270068867217> or </dare:1169062270068867215> \n## Configure the bot \n  \n## Privacy \n If you dont want to show up on leaderboards or votes. You can adjust your privacy settings using </privacy:1162855843658735716>. To find out what data we store visit our [Privacy Policy](https://wouldyoubot.gg/privacy)`,
      );

    const button =
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        new ButtonBuilder()
          .setLabel("Would You Support")
          .setStyle(5)
          .setEmoji("💫")
          .setURL("https://discord.gg/vMyXAxEznS"),
        new ButtonBuilder()
          .setLabel("Would You Invite")
          .setStyle(5)
          .setEmoji("1009964111045607525")
          .setURL(
            "https://discord.com/oauth2/authorize?client_id=981649513427111957&permissions=275415247936&scope=bot%20applications.commands",
          ),
        new ButtonBuilder()
          .setLabel("View Commands")
          .setCustomId("viewCommands")
          .setStyle(2)
          .setEmoji("➡️"),
      );
    await interaction
      .reply({
        content: "discord.gg/vMyXAxEznS",
        embeds: [helpembed],
        components: [button],
      })
      .catch((err) => {
        captureException(err);
      });
  },
};

export default command;
