// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js';

import fs from 'fs'
import path from 'path'
import config from './config.js'

const {discord} = config;
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let serversIds = [discord.servers.piratas]

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    const guilds = (c.guilds.cache.map(guild => guild))
    serversIds = guilds.map(guild => guild.id)
    console.log(guilds);
    console.log(`Ready! Logged in as ${c.user.tag}`);
});


// Log in to Discord with your client's token
client.login(discord.token);
//to register https://discord.com/api/oauth2/authorize?client_id=1118844589357400090&permissions=8&scope=bot%20applications.commands

const commands = [];
const commandsExecutors = []
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.resolve('./commands')
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
        const { default: module } = await import(filePath);
        if ('data' in module && 'execute' in module) {
            commands.push(module.data.toJSON());
            const commandExecution = Object.assign(module.data.toJSON(), {execute:module.execute})
            commandsExecutors.push(commandExecution);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }   
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(discord.token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		// The put method is used to fully refresh all commands in the guild with the current set
        serversIds.forEach(async (serverId) => {
            const data = await rest.put(
                Routes.applicationGuildCommands(discord.app_id, serverId),
                { body: commands },
            );
            commands.push(data)
            console.log('data', data)
    
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);


client.on(Events.InteractionCreate, async interaction => {
	console.log(interaction);
    const commandName = interaction.commandName;

    if(commandName){
        const command = commands.find(command => command.name === commandName);
        if(command){
            try {
                await commandsExecutors.find(command => command.name === commandName).execute(interaction);
            } catch (error) {
                console.error(error);
                interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
    
});
        })
        
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
