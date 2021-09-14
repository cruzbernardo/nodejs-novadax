const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('diferente').setDescription('Replies dedé is diferent'),
	new SlashCommandBuilder().setName('buybtc').setDescription('Show the last 5 bids for btc in brl'),
	new SlashCommandBuilder().setName('sellbtc').setDescription('Show the last 5 asks for btc in brl'),
	new SlashCommandBuilder().setName('buyeth').setDescription('Show the last 5 bids for eth in brl'),
	new SlashCommandBuilder().setName('selleth').setDescription('Show the last 5 asks for eth in brl'),
	new SlashCommandBuilder().setName('buyada').setDescription('Show the last 5 bids for ada in brl'),
	new SlashCommandBuilder().setName('sellada').setDescription('Show the last 5 asks for ada in brl')
]	
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();