import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';

import config from '@config';
import { GuildProfileDocument } from '@models/guildProfile.model';
import { CoreButton } from '@typings/core';
import { ExtendedClient } from 'src/client';

const button: CoreButton = {
  name: 'neverhaveiever',
  description: 'never have i ever',
  async execute(
    interaction: ButtonInteraction,
    client: ExtendedClient,
    guildDb: GuildProfileDocument
  ) {
    if (!interaction.guildId) return;

    const { Funny, Basic, Young, Food, RuleBreak } = (
      await import(`../../constants/nhie-${guildDb.language}.json`)
    ).default;

    const neverArray = [...Funny, ...Basic, ...Young, ...Food, ...RuleBreak];
    const randomNever = Math.floor(Math.random() * neverArray.length);

    const ratherembed = new EmbedBuilder()
      .setColor(config.colors.primary)
      .setFooter({
        text: `Requested by ${interaction.user.username} | Type: Random | ID: ${randomNever}`,
        iconURL: interaction.user.avatarURL() || undefined,
      })
      .setFooter({
        text: `Requested by ${interaction.user.username} | Type: General | ID: ${randomNever}`,
        iconURL: interaction.user.avatarURL() || undefined,
      })
      .setDescription(neverArray[randomNever]);

    const mainRow = new ActionRowBuilder<ButtonBuilder>();
    if (Math.round(Math.random() * 15) < 3) {
      mainRow.addComponents([
        new ButtonBuilder()
          .setLabel('Invite')
          .setStyle(ButtonStyle.Link)
          .setEmoji(config.emojis.logo.id)
          .setURL(config.links.invite),
      ]);
    }
    mainRow.addComponents([
      new ButtonBuilder()
        .setLabel('New Question')
        .setStyle(ButtonStyle.Primary)
        .setEmoji(config.emojis.replay.id)
        .setCustomId(`neverhaveiever`),
    ]);

    const time = 60_000;
    const threeMinutes = 3 * 60 * 1e3;

    const vote = await client.voting.generateVoting(
      interaction.guildId,
      interaction.channelId,
      time < threeMinutes ? 0 : Math.floor((Date.now() + time) / 1000),
      1
    );

    if (!vote) return;

    return interaction
      .reply({
        embeds: [ratherembed],
        components: [vote.row, mainRow],
      })
      .catch(client.logger.error);
  },
};

export default button;
