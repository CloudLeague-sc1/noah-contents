const EmptyMultilingualText = {
  en: '',
  ja: '',
};

export const getEmptyMultilingualText = (): MultilingualText =>
  Object.assign({}, EmptyMultilingualText);

export type MultilingualText = typeof EmptyMultilingualText;
export type Language = keyof MultilingualText;
export const languages = Object.keys(EmptyMultilingualText) as Language[];

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
  text: MultilingualText;
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
  text: MultilingualText;
};

export type Warning = {
  type: 'warn';
  text: MultilingualText;
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
  question: MultilingualText;
  options: QuizOption[];
};

export type QuizOption = {
  correct: boolean;
  text: MultilingualText;
  comment: MultilingualText;
};

export type Summary = MultilingualText[];
