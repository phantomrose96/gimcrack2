import fs from 'fs';
import { Chapter } from '../interfaces/Story';
import path from 'path';

const file = fs.readFileSync(
  path.join(__dirname, '/../../dist/ABoTjson.txt'),
  'utf8',
);
const story = JSON.parse(file);

export const ABoT: Chapter[] = story;
