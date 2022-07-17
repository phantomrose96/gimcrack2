import { WheelIcons } from '../../strings/WheelIcons';

export function numberOfWins(arr: number[]): number {
  if (arr.length != 9) {
    throw new Error('Array for roulette spin is wrong dimension');
  }
  return rowWins(arr) + colWins(arr) + diagWins(arr);
}

function rowWins(arr: number[]): number {
  return [0, 3, 6].reduce((acc, val) => {
    return checkStreak(arr, val, val + 1, val + 2) + acc;
  }, 0);
}

function colWins(arr: number[]): number {
  return [0, 1, 2].reduce((acc, val) => {
    return checkStreak(arr, val, val + 3, val + 6) + acc;
  }, 0);
}

function diagWins(arr: number[]): number {
  return [2, 4].reduce((acc, val) => {
    return checkStreak(arr, 4, 4 + val, 4 - val) + acc;
  }, 0);
}

function checkStreak(
  arr: number[],
  ind1: number,
  ind2: number,
  ind3: number,
): number {
  return arr[ind1] === arr[ind2] && arr[ind1] === arr[ind3] ? 1 : 0;
}

export function generateSpin(): number[] {
  const iconNumber = WheelIcons.length;
  const arr = new Array(9).fill(0).map((_v) => {
    return Math.floor(Math.random() * iconNumber);
  });
  return arr;
}
