require('dotenv').config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

/* ROLES ID AND BUTTONS NAME */
const roles = [
    {
        id: '1179781951830364180',
        label: 'Verify',
        emoji: '✅'
    }
]

client.on('ready', async (c) => {
    try {
        const verifyChannelName = 'verification'; /* VERIFICATION CHANNEL NAME */
        const verifyChannel =  c.channels.cache.find((channel) => channel.name === verifyChannelName);
        if(!verifyChannel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                .setCustomId(role.id)
                .setLabel(role.label)
                .setStyle(ButtonStyle.Primary)
                .setEmoji(role.emoji)
            )
        })
        
        const embedRole = new EmbedBuilder()
        .setTitle('Verification!!!')
        .setDescription('Please choose your role here')
        .setColor('Green')

        await verifyChannel.send({
            embeds: [embedRole],
            components:[row],
        });
        process.exit()
    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.DISCORD_TOKEN);