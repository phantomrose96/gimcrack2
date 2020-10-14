export const onAskResponses: string[] = [
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
];

export const onFetchQuoteResponses: string[] = [
  'Here ya go:',
  'Finding this one was tricky! Maybe tip a little more next time?',
  'Abra cadabra',
];

export const onBalanceResponses: string[] = [
  'Cha-ching!',
  'Here',
  'Ritsu would be jealous',
];

export const onDailiesResponses: string[] = [
  "Skimmed these off Ritsu. Don't tell him.",
];

export const onSpinResponses: string[] = [
  'Well would you look at that? ',
  'Results! ',
  'Winner winner! ',
];

export const onAssignRoleResponses: string[] = [
  'Here ya go: ',
  'Bam, done: ',
];

export const onRemoveRoleResponses: string[] = [
  'Cleared that out for ya. No more ',
  'Say goodbye to role ',
];

export const onFetchChapterResponses: string[] = [
  'Sure thing bucko',
  'Coming right up',
  "I wonder if I'm in this chapter",
  "Careful! It's hot.",
];

export function generateResponse(responses: string[]): string {
  if (responses.length === 0) {
    return '';
  }
  const index = Math.floor(Math.random() * responses.length);
  return responses[index];
}
