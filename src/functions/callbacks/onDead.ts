import Discord from 'discord.js';

export async function onDead(message: Discord.Message) {
  const newMessage = await message.channel.send(
    '                                                                              _ _',
  );
  await timeout(1000);
  newMessage.edit(
    '.                                                                              _ _',
  );
  await timeout(1000);
  newMessage.edit(
    '..                                                                              _ _',
  );
  await timeout(1000);
  newMessage.edit(
    '...                                                                             _ _',
  );
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
