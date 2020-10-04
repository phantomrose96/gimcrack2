import fs from 'fs';
import { Story } from '../interfaces/Story';

const file = fs.readFileSync('./Story.json', 'utf8');
export const ABoT: Story = JSON.parse(file);
