const EmptyMultilingualText = {
  en: '',
  ja: '',
};

export const getEmptyMultilingualText = (): MultilingualText =>
  Object.assign({}, EmptyMultilingualText);

export type MultilingualText = typeof EmptyMultilingualText;
export type Language = keyof MultilingualText;
export const languages = Object.keys(EmptyMultilingualText) as Language[];

const EmptyMultilingualRichText = {
  en: [] as RichText,
  ja: [] as RichText,
};

export const getEmptyMultilingualRichText = (): MultilingualRichText =>
  Object.assign({}, EmptyMultilingualRichText);

export type MultilingualRichText = typeof EmptyMultilingualRichText;

export type RichTextInner =
  | string
  | {
      kind: 'bold' | 'italic' | 'em' | 'br' | 'u' | 's';
      inner: RichText;
    };
export type RichText = RichTextInner[];

export type Document = Cource[];
export type Cource = {
  title: MultilingualText;
  description: MultilingualText;
  lessons: Lesson[];
};

export type Description = {
  desc: MultilingualText;
};

export type Lesson = {
  title: MultilingualText;
  pages: (Page | Quiz)[];
  summary: Summary;
};

export type Page = {
  type: 'page';
  text: MultilingualRichText;
  media?: YouTube | Image | Audio;
  annnotation?: Note | Warning;
  references?: References;
};

export type YouTube = {
  type: 'youtube';
  videoid: string;
};

export type Image = {
  type: 'image';
  src: string;
};
export type Audio = {
  type: 'audio';
  src: string;
};

export type Note = {
  type: 'note';
  text: MultilingualRichText;
};

export type Warning = {
  type: 'warn';
  text: MultilingualRichText;
};

export type References = WebItem[];

export type WebItem = {
  type: 'web';
  title: string;
  url: string;
  as_of: string;
};

export type Quiz = {
  type: 'quiz';
  quiz_type: 'multiple_choice';
  question: MultilingualRichText;
  options: QuizOption[];
};

export type QuizOption = {
  correct: boolean;
  label: MultilingualText;
  comment: MultilingualRichText;
};

export type Summary = MultilingualRichText[];
