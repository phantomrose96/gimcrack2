import {
  generateSpin,
  numberOfWins,
} from './functions/helpers/RouletteHelpers';

const outcomes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const parseSpins = process.argv[0].match(/\d+/);
const spins = parseSpins
  ? ((parseSpins[0] as unknown) as number)
  : 10000;

for (let i = 0; i < spins; i++) {
  const spin = generateSpin();
  const wins = numberOfWins(spin);
  outcomes[wins] += 1;
}

console.log(outcomes);
let payout = 0;
outcomes.forEach((el, ind) => {
  payout += (el / spins) * ind;
});
console.log(payout);
