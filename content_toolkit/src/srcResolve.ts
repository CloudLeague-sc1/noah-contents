import { Document, Image, Audio } from './types/XMLTypes';
import { is } from 'typescript-is';
import fs from 'fs';
import path from 'path';
import { fileTypeFromFile } from 'file-type';

export default async (dir: string, doc: Document): Promise<Document> => {
  const document = doc;
  for (const cource of document) {
    for (const lesson of cource.lessons) {
      for (const page of lesson.pages) {
        if (page.type === 'page') {
          if (is<Image>(page.media)) {
            page.media.src = await pathToBase64(path.join(dir, page.media.src));
          } else if (is<Audio>(page.media)) {
            page.media.src = await pathToBase64(path.join(dir, page.media.src));
          }
        }
      }
    }
  }

  return document;
};

const pathToBase64 = async (path: string) => {
  const file = fs.readFileSync(path, { encoding: 'base64' });
  const type = await fileTypeFromFile(path);

  return `data:${type?.mime};base64,${file}`;
};
