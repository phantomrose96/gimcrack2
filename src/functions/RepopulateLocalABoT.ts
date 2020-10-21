import { rootsite } from '../structs/Mappings';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs';
import { Chapter } from 'src/interfaces/Story';
import path from 'path';

function getNewChapterTemplate(
  contents: string[],
  hyperlink: string,
): Chapter {
  return {
    content: contents,
    hyperlink: hyperlink,
    date: null,
    authorNotes: '',
    length: 0,
    reviews: [],
  };
}
export async function repopulateLocalABoT() {
  const URL: string = rootsite + '/';
  const response = await fetch(URL);
  const HTMLText = await response.text();
  const $ = await cheerio.load(HTMLText);

  const chapters = await crawlChapters($);
  const stringify = JSON.stringify(chapters);
  fs.writeFile(
    path.join(__dirname, '/../../dist/ABoTjson.txt'),
    stringify,
    (err) => {
      console.log(err);
    },
  );
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
  const hyperlink = fetchChapterLinkFromChapter($, chapterNumber);
  if (hyperlink === '') {
    return Promise.resolve(chapters);
  }

  const response = await fetch(hyperlink);
  const HTMLText = await response.text();
  const $chapter = await cheerio.load(HTMLText);
  const $contents = $chapter('div[role="article"]')[0].children;

  const chapterContents = processChapterContent($contents);

  const newChapter: Chapter = getNewChapterTemplate(
    chapterContents,
    hyperlink,
  );

  setTimeout(() => {}, 500); // dont want AO3 to ding me for spammy bot activity :<

  const cumulativeChapters = await populateChapterContent(
    chapters.concat(newChapter),
    $,
    chapterNumber + 1,
  );

  return Promise.resolve(cumulativeChapters);
}

function processChapterContent(
  contents: cheerio.Element[],
): string[] {
  let chapterContents: string[] = [];
  contents.forEach((element) => {
    let paragraphText = '';
    const divContent =
      element.name === 'p' ? element.children : undefined;
    if (!divContent) {
      return;
    }
    paragraphText += iterateOverChildren(divContent);
    chapterContents = chapterContents.concat(paragraphText);
  });
  return chapterContents;
}

function iterateOverChildren(elements: cheerio.Element[]): string {
  let newText = '';
  elements.forEach((element) => {
    if (element.data) {
      newText += element.data;
    }
    if (element.childNodes) {
      newText += iterateOverChildren(element.childNodes);
    }
  });
  return newText;
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
