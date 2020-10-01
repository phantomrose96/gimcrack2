const Discord = require('discord.js');
const TOKEN = require('./token').TOKEN;
const callbacks = require('./functions');

const client = new Discord.Client();

if(TOKEN) {
	client.login(TOKEN).catch(console.error);
}

client.on('ready', () => {
	console.log('logged in as ' + client.user.tag);
});

client.on('message', message => {
	callbacks.onMessage(message);
});

https://zoom.us/j/92484774741?pwd=WENxeVNWaUtkd2RyV3gzSUpNWUR0UT09
// debug: onMessage({ content: '!fetch 12' });