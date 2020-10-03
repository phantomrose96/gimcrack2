import { rootsite } from '../assets/strings';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

export async function fetchPageContents(
  fullwork?: boolean,
): Promise<cheerio.Root> {
  const URL: string =
    rootsite + (fullwork ? '?view_full_work=true/' : '/');
  const response = await fetch(URL);
  const HTMLText = await response.text();

  return new Promise((resolve) => {
    resolve(cheerio.load(HTMLText));
  });
}
