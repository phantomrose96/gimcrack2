import Discord from 'discord.js';

export enum RoleAction {
  'remove' = 0,
  'add' = 1,
}

export async function onAssignRole(
  message: Discord.Message,
  response: string,
) {
  await onManageRole(message, response, RoleAction.add);
}

export async function onRemoveRole(
  message: Discord.Message,
  response: string,
) {
  await onManageRole(message, response, RoleAction.remove);
}

async function onManageRole(
  message: Discord.Message,
  response: string,
  roleAction: RoleAction,
): Promise<void> {
  if (!message.member) {
    return;
  }
  const role = await fetchRole(message);
  if (!role) {
    return;
  }

  // how to XOR in MS Paint?
  if (!(roleAction ^ hasRole(message, role))) {
    message.channel.send("That won't change anything");
    return;
  }

  const action =
    roleAction === RoleAction.add
      ? message.member.roles.add.bind(message.member.roles)
      : message.member.roles.remove.bind(message.member.roles);

  action(role)
    .then(() => message.channel.send(response + message.content))
    .catch((_err: Error) =>
      message.channel.send(
        'Ain\'t got enough permissions for that,
      ),
    );
}

async function fetchRole(
  message: Discord.Message,
): Promise<Discord.Role | undefined> {
  const role = await message.guild?.roles.cache.find(
    (r) => r.name === message.content,
  );

  if (!role) {
    message.channel.send("Can't find that role");
  }

  return Promise.resolve(role);
}

function hasRole(
  message: Discord.Message,
  role: Discord.Role | undefined,
): number {
  return !!message.member?.roles.cache.find((r) => r === role)
    ? 1
    : 0;
}
