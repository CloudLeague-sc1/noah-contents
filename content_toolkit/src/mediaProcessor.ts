import { Document, Image, Audio } from './types/XMLTypes';
import { is } from 'typescript-is';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export default async (
  sourceDir: string,
  doc: Document,
  mediaDestDir: string
): Promise<Document> => {
  const copyFilesQueue: Promise<void>[] = [];
  const document = doc;
  for (const course of document) {
    for (const lesson of course.lessons) {
      for (const page of lesson.pages) {
        if (page.type === 'page') {
          if (is<Image>(page.media) || is<Audio>(page.media)) {
            const src = path.join(sourceDir, page.media.src);
            const ext = path.extname(src);
            const hash = await computeFileHash(src);
            page.media.src = hash + ext;
            copyFilesQueue.push(
              fs.copyFile(src, path.join(mediaDestDir, page.media.src))
            );
          }
        }
      }
    }
  }

  await Promise.all(copyFilesQueue);
  return document;
};

const computeFileHash = async (path: string) => {
  const file = await fs.readFile(path);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(file);
  return hashSum.digest('hex');
};
