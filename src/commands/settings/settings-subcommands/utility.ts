import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    MessageActionRowComponentBuilder,
  } from "discord.js";
  import { IGuildModel } from "../../../util/Models/guildModel";
  import WouldYou from "../../../util/wouldYou";
  
  export default async function settingsGeneral(
    interaction: ChatInputCommandInteraction,
    client: WouldYou,
    guildDb: IGuildModel,
  ) {
    const emb = new EmbedBuilder()
      .setTitle("Would You - Utility")
      .setDescription(
        `${client.translation.get(
          guildDb?.language,
          "Settings.embed.welcome",
        )}: ${guildDb.welcome ? ":white_check_mark:" : ":x:"}\n${client.translation.get(
          guildDb?.language,
          "Settings.embed.welcomePing",
        )}: ${guildDb.welcomePing ? ":white_check_mark:" : ":x:"}\n${client.translation.get(
          guildDb?.language,
          "Settings.embed.dailyType",
        )}: ${guildDb.welcomeType}\n${client.translation.get(
          guildDb?.language,
          "Settings.embed.welcomeChannel",
        )}: ${guildDb.welcomeChannel ? `<#${guildDb.welcomeChannel}>` : ":x:"}\n${client.translation.get(
          guildDb?.language,
          "Settings.embed.username",
        )}: ${guildDb.premName ? guildDb.premName : ":x:"}\n${client.translation.get(
          guildDb?.language,
          "Settings.embed.avatar",
        )}: ${guildDb.premAvatar ? `[Image](<${guildDb.premAvatar}>)` : `:x:`}`,
      )
      .setColor("#0598F6")
      .setFooter({
        text: client.translation.get(
          guildDb?.language,
          "Settings.embed.footer",
        ),
        iconURL: client?.user?.displayAvatarURL() || undefined,
      });
  
    // First button row
    // Deals with toggles
    const welcomeButtons1 =
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("welcomeType")
          .setEmoji("1185973664538177557")
          .setLabel(
            client.translation.get(
              guildDb?.language,
              "Settings.button.dailyType",
            ),
          )
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("welcomeChannel")
          .setEmoji("1185973667973320775")
          .setLabel(
            client.translation.get(
              guildDb?.language,
              "Settings.button.welcomeChannel",
            ),
          )
          .setStyle(
            guildDb.welcomeChannel ? ButtonStyle.Primary : ButtonStyle.Secondary,
          ),
        new ButtonBuilder()
          .setCustomId("welcomeTest")
          .setLabel(
            client.translation.get(
              guildDb?.language,
              "Settings.button.welcomeTest",
            ),
          )
          .setDisabled(guildDb.welcome ? false : true)
          .setStyle(guildDb.welcome ? ButtonStyle.Primary : ButtonStyle.Secondary)
          .setEmoji("1207800685928910909"),
      );
  
    // Second button row
    // Deals with type, channel, test
    const welcomeButtons2 =
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("welcome")
          .setEmoji("1185973660465500180")
          .setLabel(
            client.translation.get(guildDb?.language, "Settings.button.welcome"),
          )
          .setStyle(
            guildDb.welcome ? ButtonStyle.Success : ButtonStyle.Secondary,
          ),
        new ButtonBuilder()
          .setCustomId("welcomePing")
          .setEmoji("1207801424503644260")
          .setLabel(
            client.translation.get(
              guildDb?.language,
              "Settings.button.welcomePing",
            ),
          )
          .setStyle(
            guildDb.welcomePing ? ButtonStyle.Success : ButtonStyle.Secondary,
          ),
      );
    
        const welcomeButtons3 =
          new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
            new ButtonBuilder()
              .setCustomId("premName")
              .setEmoji("1185973660465500180")
              .setLabel(
                client.translation.get(
                  guildDb?.language,
                  "Settings.button.name",
                ),
              )
              .setStyle(
                guildDb.premName ? ButtonStyle.Success : ButtonStyle.Secondary,
              ),
            new ButtonBuilder()
              .setCustomId("premAvatar")
              .setEmoji("1207801424503644260")
              .setLabel(
                client.translation.get(
                  guildDb?.language,
                  "Settings.button.avatar",
                ),
              )
              .setStyle(
                guildDb.premAvatar ? ButtonStyle.Success : ButtonStyle.Secondary,
              )
          );
  
    await interaction.reply({
      embeds: [emb],
      components: [welcomeButtons2, welcomeButtons1, welcomeButtons3],
      ephemeral: true,
    });
  }
  