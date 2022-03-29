import {
  Document,
  Course,
  MultilingualText,
  MultilingualRichText,
  getEmptyMultilingualText,
  getEmptyMultilingualRichText,
  Language,
  Lesson,
  Page,
  YouTube,
  Image,
  Audio,
  Note,
  Warning,
  References,
  WebItem,
  Quiz,
  QuizOption,
  Summary,
  RichText,
  RichTextInner,
} from './types/XMLTypes';

import {
  UglyDocument,
  UglyCourse,
  UglyTitle,
  UglyMultilingualText,
  UglyMultilingualRichText,
  UglyText,
  UglyLanguage,
  UglyRichText,
  UglyRichTextInner,
  UglyRichTextBold,
  UglyRichTextItalic,
  UglyRichTextEm,
  UglyRichTextBr,
  UglyRichTextUnderline,
  UglyRichTextStrikeline,
  UglyPageText,
  UglyDescription,
  UglyLesson,
  UglyPage,
  UglyYouTube,
  UglyImage,
  UglyAudio,
  UglyNote,
  UglyWarning,
  attributeObjectName,
  UglyReferences,
  UglyWebItem,
  UglyReferenceItemTitle,
  UglyURL,
  UglyQuiz,
  UglyQuizQuestion,
  UglyQuizSelection,
  UglyQuizOption,
  UglyQuizOptionLabel,
  UglyQuizOptionComment,
  UglySummary,
  UglyAsOf,
} from './types/UglyXMLTypes';

import { is } from 'typescript-is';

export default (document: UglyDocument): Document => {
  return document.map((course) => beautifyCourse(course));
};

const beautifyCourse = (uglyCourse: UglyCourse): Course => {
  const course: Course = {
    title: getEmptyMultilingualText(),
    description: getEmptyMultilingualText(),
    lessons: [],
  };

  for (const item of uglyCourse.course) {
    if (is<UglyTitle>(item)) {
      course.title = beautifyTitle(item);
    } else if (is<UglyDescription>(item)) {
      course.description = beautifyDescription(item);
    } else if (is<UglyLesson>(item)) {
      course.lessons.push(beautifyLessons(item));
    } else {
      console.dir(item, { depth: null });
      throw new Error('Invalid item. ');
    }
  }
  return course;
};

const beautifyTitle = (uglyTitle: UglyTitle): MultilingualText => {
  return beautifyMultilingualText(uglyTitle.title);
};

const beautifyText = (
  uglyText: UglyLanguage<[UglyText]>
): { lang: Language; text: string } => {
  const lang = Object.keys(uglyText)[0];

  if (!is<Language>(lang)) {
    throw new Error(`Unspported language '${lang}' is specified.`);
  }

  const text = uglyText[lang][0];

  if (!is<UglyText>(text)) {
    console.dir(text, { depth: null });
    throw new Error(`Received malformed text object.`);
  }

  return { lang, text: beautifyUglyTextInner(text) };
};

const beautifyMultilingualText = (
  uglyMultilingualText: UglyMultilingualText
): MultilingualText => {
  const multilingualText: MultilingualText = getEmptyMultilingualText();

  for (const item of uglyMultilingualText) {
    const { lang, text } = beautifyText(item);
    multilingualText[lang] = text;
  }
  return multilingualText;
};

const beautifyMultilingualRichText = (
  uglyMultilingualRichText: UglyMultilingualRichText
): MultilingualRichText => {
  const multilingualRichText: MultilingualRichText =
    getEmptyMultilingualRichText();

  for (const item of uglyMultilingualRichText) {
    const { lang, text } = beautifyRichText(item);
    multilingualRichText[lang] = text;
  }
  return multilingualRichText;
};

const beautifyRichText = (
  uglyRichText: UglyLanguage<UglyRichText>
): { lang: Language; text: RichText } => {
  const lang = Object.keys(uglyRichText)[0];

  if (!is<Language>(lang)) {
    throw new Error(`Unspported language '${lang}' is specified.`);
  }

  const text = uglyRichText[lang];

  if (!is<UglyRichTextInner[]>(text)) {
    throw new Error(`Received malformed text object.`);
  }

  return { lang, text: text.map(beautifyUglyRichTextInner) };
};

const beautifyUglyRichTextInner = (
  uglyRichTextInner: UglyRichTextInner
): RichTextInner => {
  if (is<UglyText>(uglyRichTextInner)) {
    return beautifyUglyTextInner(uglyRichTextInner);
  } else if (is<UglyRichTextBold>(uglyRichTextInner)) {
    return {
      kind: 'bold',
      inner: uglyRichTextInner.b.map((x) => beautifyUglyRichTextInner(x)),
    };
  } else if (is<UglyRichTextItalic>(uglyRichTextInner)) {
    return {
      kind: 'italic',
      inner: uglyRichTextInner.i.map((x) => beautifyUglyRichTextInner(x)),
    };
  } else if (is<UglyRichTextEm>(uglyRichTextInner)) {
    return {
      kind: 'em',
      inner: uglyRichTextInner.em.map((x) => beautifyUglyRichTextInner(x)),
    };
  } else if (is<UglyRichTextBr>(uglyRichTextInner)) {
    return '\n';
  } else if (is<UglyRichTextUnderline>(uglyRichTextInner)) {
    return {
      kind: 'u',
      inner: uglyRichTextInner.u.map((x) => beautifyUglyRichTextInner(x)),
    };
  } else if (is<UglyRichTextStrikeline>(uglyRichTextInner)) {
    return {
      kind: 's',
      inner: uglyRichTextInner.s.map((x) => beautifyUglyRichTextInner(x)),
    };
  } else {
    throw new Error('Unsupported RichTextInner');
  }
};

const beautifyDescription = (
  uglyDescription: UglyDescription
): MultilingualText => {
  return beautifyMultilingualText(uglyDescription.desc);
};

const beautifyLessons = (uglyLesson: UglyLesson): Lesson => {
  const lesson: Lesson = {
    title: getEmptyMultilingualText(),
    pages: [],
    summary: [],
  };

  for (const item of uglyLesson.lesson) {
    if (is<UglyTitle>(item)) {
      lesson.title = beautifyTitle(item);
    } else if (is<UglyPage>(item)) {
      lesson.pages.push(beautifyPage(item));
    } else if (is<UglyQuiz>(item)) {
      lesson.pages.push(beautifyQuiz(item));
    } else if (is<UglySummary>(item)) {
      lesson.summary = beautifySummary(item);
    } else {
      throw new Error('Unexpected item in lesson');
    }
  }

  return lesson;
};

const beautifyPage = (uglyPage: UglyPage): Page => {
  const page: Page = {
    type: 'page',
    text: getEmptyMultilingualRichText(),
    media: undefined,
    annotation: undefined,
    references: undefined,
  };

  for (const item of uglyPage.page) {
    if (is<UglyPageText>(item)) {
      page.text = beautifyPageText(item);
    } else if (is<UglyYouTube>(item)) {
      page.media = beautifyYouTube(item);
    } else if (is<UglyImage>(item)) {
      page.media = beautifyImage(item);
    } else if (is<UglyAudio>(item)) {
      page.media = beautifyAudio(item);
    } else if (is<UglyNote>(item)) {
      page.annotation = beautifyNote(item);
    } else if (is<UglyWarning>(item)) {
      page.annotation = beautifyWarning(item);
    } else if (is<UglyReferences>(item)) {
      page.references = beautifyRefecences(item);
    } else {
      throw new Error('Unexpected item in page');
    }
  }

  return page;
};

const beautifyPageText = (uglyPageText: UglyPageText): MultilingualRichText => {
  return beautifyMultilingualRichText(uglyPageText.text);
};

const beautifyYouTube = (uglyYouTube: UglyYouTube): YouTube => {
  return {
    type: 'youtube',
    videoid: uglyYouTube[attributeObjectName].videoid,
  };
};

const beautifyImage = (uglyImage: UglyImage): Image => {
  return {
    type: 'image',
    src: uglyImage[attributeObjectName].src,
  };
};

const beautifyAudio = (uglyAudio: UglyAudio): Audio => {
  return {
    type: 'audio',
    src: uglyAudio[attributeObjectName].src,
  };
};

const beautifyNote = (uglyNote: UglyNote): Note => {
  return {
    type: 'note',
    text: beautifyMultilingualRichText(uglyNote.annotation),
  };
};

const beautifyWarning = (uglyWarning: UglyWarning): Warning => {
  return {
    type: 'warn',
    text: beautifyMultilingualRichText(uglyWarning.annotation),
  };
};

const beautifyRefecences = (uglyRefecerences: UglyReferences): References => {
  const refs = [];

  for (const item of uglyRefecerences.references) {
    if (is<UglyWebItem>(item)) {
      refs.push(beautifyWebItem(item));
    }
  }

  return refs;
};

const beautifyWebItem = (uglyWebItem: UglyWebItem): WebItem => {
  let title = '';
  let url = '';
  let as_of = '';

  for (const item of uglyWebItem.web) {
    if (is<UglyReferenceItemTitle>(item)) {
      title = beautifyReferenceItemTitle(item);
    } else if (is<UglyURL>(item)) {
      url = beautifyURL(item);
    } else if (is<UglyAsOf>(item)) {
      as_of = beautifyAsOf(item);
    } else {
      throw new Error('Unexpected item in web item');
    }
  }
  return {
    type: 'web',
    title,
    url,
    as_of,
  };
};

const beautifyReferenceItemTitle = (
  uglyReferenceItemTitle: UglyReferenceItemTitle
): string => beautifyUglyTextInner(uglyReferenceItemTitle.title[0]);

const beautifyURL = (uglyURL: UglyURL): string =>
  beautifyUglyTextInner(uglyURL.url[0]);
const beautifyAsOf = (uglyAsOf: UglyAsOf): string =>
  beautifyUglyTextInner(uglyAsOf.as_of[0]);

const beautifyQuiz = (uglyQuiz: UglyQuiz): Quiz => {
  const quiz: Quiz = {
    type: 'quiz',
    quiz_type: 'multiple_choice',
    question: getEmptyMultilingualRichText(),
    options: [],
  };

  for (const item of uglyQuiz.quiz) {
    if (is<UglyQuizQuestion>(item)) {
      quiz.question = beautifyQuizQuestion(item);
    } else if (is<UglyQuizSelection>(item)) {
      quiz.quiz_type = 'multiple_choice';
      quiz.options = beautifyQuizSelection(item);
    } else {
      throw new Error('Unexpected item in quiz');
    }
  }

  return quiz;
};

const beautifyQuizQuestion = (
  uglyQuizQuestion: UglyQuizQuestion
): MultilingualRichText =>
  beautifyMultilingualRichText(uglyQuizQuestion.question);

const beautifyQuizSelection = (
  UglyQuizSelection: UglyQuizSelection
): QuizOption[] => {
  const options = [];

  for (const item of UglyQuizSelection.select) {
    options.push(beautifyQuizOption(item));
  }

  return options;
};

const beautifyQuizOption = (uglyQuizOption: UglyQuizOption): QuizOption => {
  const quizOption: QuizOption = {
    correct: uglyQuizOption[attributeObjectName]?.correct === true,
    label: getEmptyMultilingualText(),
    comment: getEmptyMultilingualRichText(),
  };

  for (const item of uglyQuizOption.option) {
    if (is<UglyQuizOptionLabel>(item)) {
      quizOption.label = beautifyMultilingualText(item.label);
    } else if (is<UglyQuizOptionComment>(item)) {
      quizOption.comment = beautifyMultilingualRichText(item.comment);
    } else {
      throw new Error('Unexpected item in quiz option');
    }
  }

  return quizOption;
};

const beautifySummary = (uglySummary: UglySummary): Summary => {
  const summary = [];

  for (const summaryItem of uglySummary.summary) {
    summary.push(beautifyMultilingualRichText(summaryItem.item));
  }

  return summary;
};

const beautifyUglyTextInner = (uglyTextInner: UglyText): string =>
  uglyTextInner['#text'] as string;
