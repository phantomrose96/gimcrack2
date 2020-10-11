import fs from 'fs';
import { Chapter } from '../interfaces/Story';

const file = fs.readFileSync(
  __dirname + '/../../dist/ABoTjson.txt',
  'utf8',
);
const story = JSON.parse(file);

export const ABoT: Chapter[] = story;
