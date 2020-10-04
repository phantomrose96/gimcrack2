import fs from 'fs';
import { Chapter, Story } from '../interfaces/Story';

const file = fs.readFileSync(
  __dirname + '/../../dist/ABoT.txt',
  'utf8',
);
const story = JSON.parse(file);

export const ABoT: Chapter[] = story;
