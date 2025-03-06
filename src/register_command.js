require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'hello',
        description: 'hi sayo',
    },
    {
        name: 'programming_language',
        description: 'Learn programming languages',
        options: [
            {
                type: 3,
                name: 'language',
                description: 'Select a programming language to learn',
                required: true,
                choices: [
                    {
                        name: 'C Language',
                        value: 'https://www.w3schools.com/c/',
                    },
                    {
                        name: 'C++ Language',
                        value: 'https://www.w3schools.com/cpp/',
                    },
                    {
                        name: 'C# Language',
                        value: 'https://www.w3schools.com/cs/',
                    },
                    {
                        name: 'Java Language',
                        value: 'https://www.w3schools.com/java/',
                    },
                    {
                        name: 'JavaScript Language',
                        value: 'https://www.w3schools.com/js/',
                    },
                    {
                        name: 'Python Language',
                        value: 'https://www.w3schools.com/python/',
                    },
                    {
                        name: 'PHP Language',
                        value: 'https://www.w3schools.com/php/',
                    },
                    {
                        name: 'HTML Language (not a programming language)',
                        value: 'https://www.w3schools.com/html/',
                    },
                    {
                        name: 'CSS Language (not a programming language)',
                        value: 'https://www.w3schools.com/css/',
                    },
                ],
            },
        ],
    },
    {
        name: 'add',
        description: 'add 2 number',
        options: [
            {
                name: 'first_number',
                description: 'the first number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second_number',
                description: 'the second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'zaxe',
        description: 'about zaxe',
    },
    {
        name: 'confess',
        description: 'send confessions',
        options: [
            {
                name: 'message',
                description: 'The message you want to send anonymously',
                type: 3,
                required: true,
            },
        ],
    },
    {
        name: 'code',
        description: "send code",
        options: [
            {
                type: 3,
                name: 'programming_language',
                description: 'Select a programming language',
                required: true,
                choices: [
                    {
                        'name': 'C Programming Language',
                        'value': 'C Programming Language'
                    },
                    {
                        'name': 'C++ Programming Language',
                        'value': 'C++ Programming Language'
                    },
                    {
                        'name': 'C# Programming Language',
                        'value': 'C# Programming Language'
                    },
                    {
                        'name': 'Java Programming Language',
                        'value': 'Java Programming Language'
                    },
                    {
                        'name': 'JavaScript Programming Language',
                        'value': 'JavaScript Programming Language'
                    },
                    {
                        'name': 'Python Programming Language',
                        'value': 'Python Programming Language'
                    },
                    {
                        'name': 'PHP Programming Language',
                        'value': 'PHP Programming Language'
                    },
                    {
                        'name': 'HTML',
                        'value': 'HTML'
                    },
                    {
                        'name': 'CSS',
                        'value': 'CSS'
                    }
                ]
            },
            {
                name: 'title',
                description: 'title of program',
                type: 3,
                required: true
            },
            {
                name: 'codes',
                description: 'send code',
                type: 3,
                required: true
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Registering slash command...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log('BABE the slash command is registered');
    } catch (error) {
        console.log(`LOVE THERE WAS AN ERROR: ${error}`);
    }
})();