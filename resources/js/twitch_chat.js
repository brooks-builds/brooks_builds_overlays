const twitchChat = new WebSocket('wss://irc-ws.chat.twitch.tv/');
const commands = [];

twitchChat.addEventListener('open', () => {
    twitchChat.send(`PASS ${twitchPass}`);
    twitchChat.send(`NICK ${twitchUser}`);
    twitchChat.send(`JOIN #${twitchChannel}`);
});

twitchChat.addEventListener('message', event => {
    if (event.data.includes('PING')) {
        twitchChat.send('PONG :tmi.twitch.tv');
    }

    commands.forEach(command => {
        const regex = new RegExp(`${command} *.*`)
        const rawCommand = event.data.match(regex);
        if (rawCommand) command.callback(rawCommand[0].replace(`${command}`, ''));
    });
});

function listenForCommand(trigger, callback) {
    if (trigger[0] != '#') throw new Error('trigger must begin with #');
    if (trigger.includes(' ')) throw new Error('trigger must not have a space');

    commands.push({ trigger, callback });
}