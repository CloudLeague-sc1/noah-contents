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
  text: UglyMultilingualText;
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
  annotation: UglyMultilingualText;
  [attributeObjectName]: {
    type: 'note';
  };
};

export type UglyWarning = {
  annotation: UglyMultilingualText;
  [attributeObjectName]: {
    type: 'warn';
  };
};

export type UglyReferences = {
  references: UglyWebItem[];
};

export type UglyReferenceItemTitle = {
  title: UglyTextInner;
};

export type UglyURL = {
  url: UglyTextInner;
};

export type UglyAsOf = {
  as_of: UglyTextInner;
};

export type UglyWebItem = {
  web: (UglyReferenceItemTitle | UglyURL | UglyAsOf)[];
};

export type UglyQuiz = {
  quiz: (UglyQuizQuestion | UglyQuizSelection)[];
};

export type UglyQuizQuestion = {
  question: UglyMultilingualText;
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
  comment: UglyMultilingualText;
};

export type UglySummary = {
  summary: UglySummaryItem[];
};

export type UglySummaryItem = {
  item: UglyMultilingualText;
};

export type UglyMultilingualText = UglyText[];

export type UglyText = {
  [lang: string]: UglyTextInner;
};

export type UglyTextInner = [
  {
    '#text': string | number;
  }
];
