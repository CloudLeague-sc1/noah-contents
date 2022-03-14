export const attributeObjectName = ':@';

export type UglyDocument = UglyCource[];
export type UglyCource = {
  cource: (UglyTitle | UglyDescription | UglyLesson)[];
};

export type UglyTitle = {
  title: UglyMultilingualText;
};

export type UglyDescription = {
  desc: UglyMultilingualText;
};

export type UglyLesson = {
  lesson: (UglyTitle | UglyPage | UglyQuiz | UglySummary)[];
};

export type UglyPage = {
  page: (
    | UglyPageText
    | (UglyYouTube | UglyImage | UglyAudio)
    | (UglyNote | UglyWarning)
    | UglyReferences
  )[];
};

export type UglyPageText = {
  text: UglyMultilingualRichText;
};

export type UglyYouTube = {
  youtube: [];
  [attributeObjectName]: {
    videoid: string;
  };
};

export type UglyImage = {
  image: [];
  [attributeObjectName]: {
    src: string;
  };
};

export type UglyAudio = {
  audio: [];
  [attributeObjectName]: {
    src: string;
  };
};

export type UglyNote = {
  annotation: UglyMultilingualRichText;
  [attributeObjectName]: {
    type: 'note';
  };
};

export type UglyWarning = {
  annotation: UglyMultilingualRichText;
  [attributeObjectName]: {
    type: 'warn';
  };
};

export type UglyReferences = {
  references: UglyWebItem[];
};

export type UglyReferenceItemTitle = {
  title: [UglyText];
};

export type UglyURL = {
  url: [UglyText];
};

export type UglyAsOf = {
  as_of: [UglyText];
};

export type UglyWebItem = {
  web: (UglyReferenceItemTitle | UglyURL | UglyAsOf)[];
};

export type UglyQuiz = {
  quiz: (UglyQuizQuestion | UglyQuizSelection)[];
};

export type UglyQuizQuestion = {
  question: UglyMultilingualRichText;
};

export type UglyQuizSelection = {
  select: UglyQuizOption[];
};

export type UglyQuizOption = {
  option: (UglyQuizOptionLabel | UglyQuizOptionComment)[];
  [attributeObjectName]?: {
    correct: boolean;
  };
};

export type UglyQuizOptionLabel = {
  label: UglyMultilingualText;
};

export type UglyQuizOptionComment = {
  comment: UglyMultilingualRichText;
};

export type UglySummary = {
  summary: UglySummaryItem[];
};

export type UglySummaryItem = {
  item: UglyMultilingualRichText;
};

export type UglyLanguage<T> = {
  [lang: string]: T;
};

export type UglyMultilingualText = UglyLanguage<[UglyText]>[];

export type UglyText = {
  '#text': string | number;
};

export type UglyMultilingualRichText = UglyLanguage<UglyRichText>[];
export type UglyRichText = UglyRichTextInner[];

export type UglyRichTextInner =
  | UglyText
  | UglyRichTextBold
  | UglyRichTextItalic
  | UglyRichTextEm
  | UglyRichTextBr
  | UglyRichTextUnderline
  | UglyRichTextStrikeline;

export type UglyRichTextBold = {
  b: UglyRichText;
};

export type UglyRichTextItalic = {
  i: UglyRichText;
};

export type UglyRichTextEm = {
  em: UglyRichText;
};

export type UglyRichTextBr = {
  br: [];
};

export type UglyRichTextUnderline = {
  u: UglyRichText;
};

export type UglyRichTextStrikeline = {
  s: UglyRichText;
};
