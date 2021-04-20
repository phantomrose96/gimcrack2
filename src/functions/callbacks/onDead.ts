import Discord from 'discord.js';

export async function onDead(
  message: Discord.Message,
  response: string,
) {
  const BUFFERSTRING =
    '                                                                              _ _';
  let tempstring = '';
  let ind = 0;
  let timer = 500;

  const newMessage = await message.channel.send(BUFFERSTRING);
  while (ind < response.length) {
    ind++;
    tempstring = response.substring(0, ind);
    await timeout(timer);
    await newMessage.edit(`${tempstring}${BUFFERSTRING}`);
  }
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
