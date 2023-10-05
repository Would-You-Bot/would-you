import {
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  MessageActionRowComponentBuilder,
} from "discord.js";
import shuffle from "../../util/shuffle";
import Sentry from "@sentry/node";
import { ChatInputCommand } from "../../models";
import { getWouldYouRather } from "../../util/Functions/jsonImport";

const command: ChatInputCommand = {
  requireGuild: true,
  data: new SlashCommandBuilder()
    .setName("wouldyourather")
    .setDescription("Get a would you rather question.")
    .setDMPermission(false)
    .setDescriptionLocalizations({
      de: "Erhalte eine Würdest du eher Frage.",
      "es-ES": "Obtiene une pregunta ¿Qué prefieres?",
      fr: "Obtenez une question préférez-vous.",
    }),

  /**
   * @param {CommandInteraction} interaction
   * @param {WouldYou} client
   * @param {guildModel} guildDb
   */

  execute: async (interaction, client, guildDb) => {
    var General = await getWouldYouRather(guildDb.language);

    const dbquestions = guildDb.customMessages.filter(
      (c) => c.type !== "nsfw" && c.type === "wouldyourather",
    );

    let wouldyourather = [];

    if (!dbquestions.length) guildDb.customTypes = "regular";

    switch (guildDb.customTypes) {
      case "regular":
        wouldyourather = shuffle([...General]);
        break;
      case "mixed":
        wouldyourather = shuffle([
          ...General,
          ...dbquestions.map((c) => c.msg),
        ]);
        break;
      case "custom":
        wouldyourather = shuffle(dbquestions.map((c) => c.msg));
        break;
    }
    const Random = Math.floor(Math.random() * wouldyourather.length);

    let ratherembed = new EmbedBuilder()
      .setColor("#0598F6")
      .setFooter({
        text: `Requested by ${interaction.user.username} | Type: General | ID: ${Random}`,
        iconURL: interaction.user.avatarURL() || undefined,
      })
      .setDescription(wouldyourather[Random] || "Unknown");

    const mainRow = new ActionRowBuilder<MessageActionRowComponentBuilder>();
    if (Math.round(Math.random() * 15) < 3) {
      mainRow.addComponents([
        new ButtonBuilder()
          .setLabel("Invite")
          .setStyle(5)
          .setEmoji("1009964111045607525")
          .setURL(
            "https://discord.com/oauth2/authorize?client_id=981649513427111957&permissions=275415247936&scope=bot%20applications.commands",
          ),
      ]);
    }
    mainRow.addComponents([
      new ButtonBuilder()
        .setLabel("New Question")
        .setStyle(1)
        .setEmoji("1073954835533156402")
        .setCustomId(`wouldyourather`)
        .setDisabled(!guildDb.replay),
    ]);

    const time = 60_000;
    const three_minutes = 3 * 60 * 1e3;

    const { row, id } = await client.voting.generateVoting(
      interaction.guildId as string,
      interaction.channelId,
      time < three_minutes ? new Date(0) : new Date(~~((Date.now() + time) / 1000)),
      "wouldyourather",
    );

    await interaction
      .reply({
        embeds: [ratherembed],
        components: [row, mainRow],
        fetchReply: true,
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
};

export default command;