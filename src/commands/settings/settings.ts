import { captureException } from "@sentry/node";
import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import { ChatInputCommand } from "../../interfaces";
import { IGuildModel } from "../../util/Models/guildModel";
import WouldYou from "../../util/wouldYou";

const command: ChatInputCommand = {
  requireGuild: true,
  data: new SlashCommandBuilder()
    .setName("settings")
    .setDMPermission(false)
    .setDescription("Change various settings throughout the bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDescriptionLocalizations({
      de: "Ändere Einstellungen für täglichen Nachrichten und Willkommensnachrichten.",
      "es-ES":
        "Cambiar la configuración de los mensajes diarios y las bienvenidas",
      fr: "Modifier les paramètres des messages quotidiens et des messages de bienvenue",
      it: "Cambia le impostazioni dei messaggi giornalieri e di benvenuto",
    })
    .addSubcommand((cmd) => {
      cmd
        .setName("cooldowns")
        .setNameLocalizations({
          de: "cooldowns",
          "es-ES": "cooldowns",
          fr: "temps-de-recharge",
        })
        .setDescription("Cooldown Settings")
        .setDescriptionLocalizations({
          de: "Cooldown Einstellungen",
          "es-ES": "Configuración Cooldown",
          fr: "Réglages de temps de recharge",
        });

      return cmd;
    })
    .addSubcommand((cmd) => {
      cmd
        .setName("qotd")
        .setNameLocalizations({
          de: "qotd",
          "es-ES": "qotd",
          fr: "qotd",
        })
        .setDescription("QOTD Settings")
        .setDescriptionLocalizations({
          de: "QOTD Nachrichteneinstellungen",
          "es-ES": "QOTD de mensajes diarios",
          fr: "Paramètres de message QOTD",
        });

      return cmd;
    })
    .addSubcommand((cmd) => {
      cmd
        .setName("welcome")
        .setNameLocalizations({
          de: "willkommen",
          "es-ES": "bienvenido",
          fr: "bienvenu",
        })
        .setDescription("Welcome Settings")
        .setDescriptionLocalizations({
          de: "Willkommenseinstellungen",
          "es-ES": "Configuración de bienvenida",
          fr: "Paramètres de bienvenue",
        });

      return cmd;
    }),
  //.addSubcommand((cmd) => {
  //  cmd
  //    .setName("premium")
  //    .setNameLocalizations({
  //      de: "premium",
  //      "es-ES": "prémium",
  //      fr: "premium",
  //    })
  //    .setDescription("Premium Settings")
  //    .setDescriptionLocalizations({
  //      de: "Premium-Einstellungen",
  //      "es-ES": "Configuración prémium",
  //      fr: "Paramètres premium",
  //    });
  //
  //  return cmd;
  //}),
  execute: async (interaction, client, guildDb) => {
    const memberHasPermissions = (
      interaction.member?.permissions as Readonly<PermissionsBitField>
    ).has(PermissionFlagsBits.ManageGuild);

    if (!memberHasPermissions) {
      const errorEmbed = new EmbedBuilder()
        .setColor("#F00505")
        .setTitle("Error!")
        .setDescription(
          client.translation.get(guildDb?.language, "Settings.embed.error"),
        );
      await interaction
        .reply({
          embeds: [errorEmbed],
          ephemeral: true,
        })
        .catch((err) => {
          captureException(err);
        });

      return;
    }

    const subCommands = {
      cooldowns: {
        fileName: "cooldowns",
      },
      qotd: {
        fileName: "qotd",
      },
      welcome: {
        fileName: "welcomes",
      },
      //premium: {
      //  fileName: "premium",
      //},
    };
    const subCommand =
      interaction.options.getSubcommand() as keyof typeof subCommands;

    type SubCommandFunction = (
      interaction: ChatInputCommandInteraction,
      client: WouldYou,
      guildDb: IGuildModel,
    ) => Promise<void>;

    const cmd: SubCommandFunction = (
      await import(
        `./settings-subcommands/${subCommands[subCommand].fileName}.js`
      )
    ).default;

    await cmd(interaction, client, guildDb);
  },
};

export default command;
