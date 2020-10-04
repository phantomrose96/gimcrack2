import { rootsite } from '../assets/Mappings';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs';
import { Chapter } from 'src/interfaces/Story';

export async function repopulateLocalABoT() {
  const URL: string = rootsite + '/';
  const response = await fetch(URL);
  const HTMLText = await response.text();
  const $ = await cheerio.load(HTMLText);

  const chapters = await crawlChapters($);
  const stringify = JSON.stringify(chapters);
  fs.writeFile('./ABoT.json', stringify, (err) => {
    console.log(err);
  });
}

async function crawlChapters($: cheerio.Root): Promise<Chapter[]> {
  const chapters: Chapter[] = await populateChapterContent([], $, 1);
  return Promise.resolve(chapters);
}

async function populateChapterContent(
  chapters: Chapter[],
  $: cheerio.Root,
  chapterNumber: number,
): Promise<Chapter[]> {
  if (chapterNumber > 3) {
    return Promise.resolve(chapters);
  }
  const hyperlink = fetchChapterLinkFromChapter($, chapterNumber);
  if (hyperlink === '') {
    return Promise.resolve(chapters);
  }

  const response = await fetch(hyperlink);
  const HTMLText = await response.text();
  const $chapter = await cheerio.load(HTMLText);
  const $contents = $chapter('div[role="article"]')[0].children;

  const chapterContents = processChapterContent($contents);

  const newChapter: Chapter = {
    content: chapterContents,
    hyperlink: hyperlink,
    date: null,
    authorNotes: '',
    length: 0,
    reviews: [],
  };

  const cumulativeChapters = await populateChapterContent(
    chapters.concat(newChapter),
    $,
    chapterNumber + 1,
  );

  return Promise.resolve(cumulativeChapters);
}

function processChapterContent(contents: cheerio.Element[]): string {
  let text = '';
  contents.forEach((element) => {
    const divContent =
      element.name === 'p' ? element.children : undefined;
    if (!divContent) {
      return;
    }
    divContent.forEach((element) => {
      text += element.data ? element.data : element.firstChild.data;
    });
    text += '\n\n';
  });
  return text;
}

function fetchChapterLinkFromChapter(
  $: cheerio.Root,
  chapter: number,
): string {
  const category = $('option').filter(
    (_ind, element) =>
      element.firstChild &&
      element.firstChild.data === `${chapter}. Chapter ${chapter}`,
  );
  const chapSuffix = category[0] ? category[0].attribs.value : '';
  if (!chapSuffix) {
    return '';
  }
  return rootsite + '/chapters/' + chapSuffix;
}

// repopulateLocalABoT();
