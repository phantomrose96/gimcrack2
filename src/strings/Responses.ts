import { IResponses } from '../interfaces/Responses';

export const GimResponses: IResponses = {
  onAskResponses: [
    'sounds like something that might happen',
    'you kiddin? not in a million years!',
    'yikes, try asking someone else maybe',
    "the answer to that is spicy, too bad I'm sworn to secrecy",
    'oh absolutely',
    'oh hell no',
    'I sure hope not',
    "I'd bet money on it",
    'no clue!',
    'hell if I know',
    'eh, try asking Kikai',
    "I'd love to tell you, but I think Chrissy might exorcise me from the server",
    "wouldn't you like to know?",
    'with a ton of luck, maybe',
    'naaaah',
    "you're asking the wrong spirit",
  ],
  onFetchQuoteResponses: [
    'Here ya go:',
    'Finding this one was tricky! Maybe tip a little more next time?',
    'Abra cadabra',
  ],
  onBalanceResponses: ['Cha-ching!', 'Here', 'Ritsu would be jealous'],
  onDailiesResponses: ["Skimmed these off Ritsu. Don't tell him."],
  onSpinResponses: [
    'Well would you look at that? ',
    'Results! ',
    'Winner winner! ',
  ],
  onAssignRoleResponses: ['Here ya go: ', 'Bam, done: '],
  onRemoveRoleResponses: [
    'Cleared that out for ya. No more ',
    'Say goodbye to role ',
  ],
  onFetchChapterResponses: [
    'Sure thing bucko',
    'Coming right up',
    "I wonder if I'm in this chapter",
    "Careful! It's hot.",
  ],
  onHelpResponses: ['Need some help?', 'I got you'],
};

export const SlipResponses: IResponses = {
  onAskResponses: [
    "I know the answer, but I'm not gonna tell you",
    'Maybe maybe maybe~',
    'Yeah, absolutely',
    'Huehuehuehue',
    "If I answer ya, I'll probably end up like Gim",
    "Nah that's never gonna happen",
    'Huehuehue, what do you think?',
    "Chrissy told me, but I ain't telling you",
    "How's about you tell ME something I wanna know first?",
    'Not in a million years',
    'I wonder :musical_note:',
    "Oh I'm _betting_ on it",
    "Yep, 100%. I'm certain of it",
    'Absolutely, I feel it in my not-bones',
    "It could happen, but it sure ain't likely",
    'Never ever ever gonna happen huehuehuehue',
  ],
  onFetchQuoteResponses: [
    'I found this one easy',
    'Gimme something harder next time, huehue',
    "'Course I know where that quote is",
    'I got these memorized',
  ],
  onBalanceResponses: [
    "Here's your balance. Mind giving me a taste?",
    "I'd die again to have this kinda energy",
    'Damn that looks tasty huehuehue',
  ],
  onDailiesResponses: ['Grabbed these right off Ritsu. Yoink!'],
  onSpinResponses: [
    'Spin spin: ',
    'Huehuehue we got a winner! ',
    'Look at that: ',
  ],
  onAssignRoleResponses: [
    'There you go: ',
    'That role looks good on ya huehue: ',
  ],
  onRemoveRoleResponses: ['Alrighty. No more role for you', 'Byebye role'],
  onFetchChapterResponses: ["I hope I'm in this chapter huehuehue"],
  onHelpResponses: ["This the information you're looking for?"],
};

export type MakeResponses =
  | 'No. That was never possible.'
  | 'Yes. It was always possible.'
  | 'Never.'
  | 'Definitely.'
  | 'In time. All things, in time.'
  | "I won't tell you. You don't deserve to know."
  | "I won't tell you. You think you deserve to know?"
  | "Don't bother me with petulent questions like that."
  | 'Yes. Was it not obvious?'
  | 'No. Was that not obvious?'
  | "I'll tell you, but at a great price."
  | "I'll never tell you, not for anything"
  | 'Of course. Now be quiet.'
  | 'No, never. Now be quiet.';

export const MakeAlters: Record<MakeResponses, MakeResponses> = {
  ['No. That was never possible.']: 'Yes. It was always possible.',
  ['Yes. It was always possible.']: 'No. That was never possible.',
  ['In time. All things, in time.']: 'In time. All things, in time.',
  ['Never.']: 'Definitely.',
  ['Definitely.']: 'Never.',
  ["I won't tell you. You don't deserve to know."]:
    "I won't tell you. You think you deserve to know?",
  ["I won't tell you. You think you deserve to know?"]:
    "I won't tell you. You don't deserve to know.",
  ["Don't bother me with petulent questions like that."]:
    "Don't bother me with petulent questions like that.",
  ['Yes. Was it not obvious?']: 'No. Was that not obvious?',
  ['No. Was that not obvious?']: 'Yes. Was it not obvious?',
  ["I'll tell you, but at a great price."]:
    "I'll never tell you, not for anything",
  ["I'll never tell you, not for anything"]:
    "I'll tell you, but at a great price.",
  ['Of course. Now be quiet.']: 'No, never. Now be quiet.',
  ['No, never. Now be quiet.']: 'Of course. Now be quiet.',
};

export const MakeResponses: IResponses = {
  onAskResponses: Object.keys(MakeAlters),
  onFetchQuoteResponses: [
    'This was a meaningless task.',
    "You'll pay in due time for this request. Trust me.",
    'Meaningless drivel. Obnoxious story.',
    "I'm biding my time. You'll see soon enough.",
    'There is nothing to learn from this. There is no saving these people.',
  ],
  onBalanceResponses: [
    'Here is what remains of your lifeforce. Best to use it carefully.',
  ],
  onDailiesResponses: [
    "Here. Shorn from Ritsu's lifeforce. What little of it he has left",
  ],
  onSpinResponses: ['Dumb luck. Little else.', '...A lucky spin', 'Loathsome.'],
  onAssignRoleResponses: ['Here is your role. Guard it.'],
  onRemoveRoleResponses: ["I've taken that role from you."],
  onFetchChapterResponses: ['Do with this what you will.', 'Pointless'],
  onHelpResponses: ['Here is your information.'],
};

export const NoneResponses: IResponses = {
  onAskResponses: [],
  onFetchQuoteResponses: [],
  onBalanceResponses: [],
  onDailiesResponses: [],
  onSpinResponses: [],
  onAssignRoleResponses: [],
  onRemoveRoleResponses: [],
  onFetchChapterResponses: [],
  onHelpResponses: [],
};

export const DeadStrings: string[] = [
  '`...`',
  '`*A cold wind blows...*`',
  '`*You feel a chill on your shoulder. Like something is there...*`',
  '`...What was that...?`',
];

export const MournStrings: string[] = [
  'I miss Gim...',
  "It's lonely without Gim...",
  'Huehue, just remembered something funny Gimcrack used to do... Ah.....',
  'I miss Gim... Sorry, whatdya say?',
];
