export interface Story {
  author: string;
  chapters: Chapter[];
}

export interface Chapter {
  content: string;
  hyperlink: string;
  date: Date | null;
  authorNotes: string;
  length: number;
  reviews: Review[];
}

export interface Review {
  content: string;
  author: string;
  date: Date;
}
