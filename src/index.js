require('dotenv').config();
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

/* (async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to db");
    
        eventHandler(client);
    } catch (error) {
        console.log(`THE ERROR: ${error}`)
    }
})(); */

/* REPLY IF THE BOT IS ONLINE */
client.on('ready', (e) => {
    console.log(`BEWARE! ${e.user.tag} is online`);

    client.user.setActivity(
        {
            name: 'I LOVE YOU',
            type: ActivityType.Custom,
        }
    )

    client.guilds.cache.forEach((guild) => {
        const generalChannelName = ['general', 'hatdog']; // GENERAL CHANNEL NAME

        const channel = guild.channels.cache.find((ch) => generalChannelName.includes(ch.name));

        if (channel) {
            try {
                channel.send(`BEWARE! ${client.user} is online!`);
            }
            catch (error) {
                console.error(`Failed to send message in channel ${channelName}:`, error);
            }
        }

    });
});

/* WELCOME THE NEW MEMBER */
client.on('guildMemberAdd', (member) => {
    const welcomeChannelNames = ['welcome'];

    function normalizeChannelName(name) {
        return name.toLowerCase().replace(/[^a-z0-9]/gi, '');
    }

    const welcomeChannel = member.guild.channels.cache.find(channel =>
        welcomeChannelNames.includes(normalizeChannelName(channel.name))
    );

    if (!welcomeChannel) return; 

    const embed = new EmbedBuilder()
        .setTitle(`BEWARE! ${member.user.tag} has joined the server!`)
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setColor('#0099ff')
        .setDescription('I like you')
        .setImage('https://media.tenor.com/2auJH5AE1fMAAAAd/welcome.gif')
        .setTimestamp();

    welcomeChannel.send({ embeds: [embed] });
});

/* MESSAGE */
client.on('messageCreate', (msg) => {
    if (msg.author.bot) return;

    const content = msg.content.toLowerCase();
    const channelNames = ['discussion', 'general'];

    function shortenRepeatedChars(input) {
        return input.replace(/(.)\1+/g, '$1');
    }
    
    const shortenedContent = shortenRepeatedChars(content);

    function normalizeChannelName(name) {
        return name.toLowerCase().replace(/[^a-z0-9]/gi, '');
    }

    const normalizedChannelName = normalizeChannelName(msg.channel.name);

    if (!channelNames.includes(normalizedChannelName)) {
        return;
    }

    if (shortenedContent.includes('helo')) {
        msg.reply(`Hi ${msg.author}, I love you`);
    }
    else if(shortenedContent.includes('hi')) {
        msg.reply(`Hello ${msg.author}, I love you`);
    }
});


/* COMMANDS REGISTERED IN register_command.js */
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    /* if (interaction.commandName === 'hello') {
        interaction.reply('Hello po'); // BOT REPLY WITH COMMAND /hello
    } */

    if (interaction.commandName === 'programming_language') {
        const lang = interaction.options.getString('language');
        interaction.reply(`Here is the link\n ${lang}`); // PROGRAMMING LANGUAGE
    }

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first_number').value;
        const num2 = interaction.options.get('second_number').value;

        interaction.reply(`the sum is ${num1 + num2}`); // ADDITION
    }

    if (interaction.commandName === 'zaxe') { // EMBED GITHUB
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'zaxe17', iconURL: 'https://avatars.githubusercontent.com/u/119933185?s=400&u=093b4ecbb8c2398f7cb8ecc9b3a7c1a5441a6274&v=4', url: 'https://github.com/zaxe17' })
            .setTitle('Zaxe\'s Github')
            /* .setURL('https://jacolbia.vercel.app/') */
            .setDescription('[github.com/zaxe17](https://github.com/zaxe17)')
            .setColor('Red')
            .addFields(
                {
                    name: 'Zaxe\'s Portfolio',
                    value: '[jacolbia.vercel.app](https://jacolbia.vercel.app)',
                    inline: true,
                },
            )
            .setImage('https://raw.githubusercontent.com/zaxe17/chrome-wallpaper/refs/heads/main/raiden/furina.gif')
            .setTimestamp()
            .setFooter({ text: 'zaxe17', iconURL: 'https://avatars.githubusercontent.com/u/119933185?s=400&u=093b4ecbb8c2398f7cb8ecc9b3a7c1a5441a6274&v=4' });

        interaction.reply({ embeds: [embed] });
    }

    if (interaction.commandName === 'confess') {
        const anonymousMessage = interaction.options.getString('message');
        const confessChannelName = 'confessions'; // CONFESS CHANNEL NAME

        function normalizeChannelName(name) {
            return name.toLowerCase().replace(/[^a-z0-9]/gi, '');
        }

        const confessChannel = interaction.guild.channels.cache.find(
            (channel) => normalizeChannelName(channel.name) === normalizeChannelName(confessChannelName)
        );

        if (!confessChannel) {
            interaction.reply({
                content: `The '${confessChannelName}' channel does not exist in this server.`,
                ephemeral: true,
            });
            return;
        }

        if (anonymousMessage) {
            const embed = new EmbedBuilder()
                .setTitle('Zaxe\'s Confession')
                .setColor('#0099ff')
                .setDescription(anonymousMessage)
                .setTimestamp();

            confessChannel.send({ embeds: [embed] });

            interaction.reply({
                content: 'Your message has been sent; you can only see this message!',
                ephemeral: true,
            });
        }
    }

    if (interaction.commandName === 'code') {
        const programming_language = interaction.options.getString('programming_language');
        const title = interaction.options.getString('title');
        const code = interaction.options.getString('codes');
        const codingChannelName = 'practice-coding'; // CODING PRACTICE CHANNEL NAME
        const codingChannel = interaction.guild.channels.cache.find((channel) => channel.name === codingChannelName);

        if (!codingChannel) {
            interaction.reply({
                content: `The '${codingChannelName}' channel does not exist in this server.`,
                ephemeral: true,
            });
            return;
        }

        if (code) {
            const embed = new EmbedBuilder()
                .setTitle(programming_language)
                .setColor('#0099ff')
                .setImage(code)
                .setTimestamp();

            codingChannel.send({ embeds: [embed] });

            interaction.reply({
                content: 'Your message has been sent; you can only see this message!',
                ephemeral: true,
            });
        }
    }
});

/* ROLE BUTTONS */
client.on('interactionCreate', async (rl) => {
    try {
        if (!rl.isButton()) return;
        await rl.deferReply({ ephemeral: true, });

        const role = rl.guild.roles.cache.get(rl.customId);
        if (!role) {
            rl.editReply({
                content: "i couldn't find your role love"
            })
            return;
        }

        const hasRole = rl.member.roles.cache.has(role.id);
        if (hasRole) {
            await rl.member.roles.remove(role);
            await rl.editReply(`The role ${role} has been removed`);
            return;
        }

        await rl.member.roles.add(role);
        await rl.editReply(`The role ${role} has been added`);
    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.DISCORD_TOKEN);