import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import path from 'path';

if (process.argv.length < 6) {
  console.log(
    'Usage: node generate.js [type] [media dest] [json dest] [files...]'
  );
  process.exit(1);
}

import simplifyOputput from './XMLTypeConversion';

import mediaProcessor from './mediaProcessor';

type CourseType = 'article' | 'sample';

const courseType: CourseType = process.argv[2] as CourseType;
const mediaDest = process.argv[3];
const jsonDest = process.argv[4];
const files = process.argv.slice(5);

const courseTypeToSuffix = (t: CourseType) =>
  `${t == 'sample' ? '.sample' : ''}.json`;

for (const file of files) {
  const XMLStr = fs.readFileSync(file, 'utf8');

  const options = {
    ignoreDeclaration: true,
    preserveOrder: true,
    ignoreAttributes: false,
    attributeNamePrefix: '',
    parseAttributeValue: true,
  };

  const parser = new XMLParser(options);
  const uglyJSObj = parser.parse(XMLStr);
  const prettyJSObj = simplifyOputput(uglyJSObj);
  const finalizedDocumentBody = await mediaProcessor(
    path.dirname(file),
    prettyJSObj,
    path.join(mediaDest)
  );

  const documentWithMetaData = finalizedDocumentBody.map((x) => {
    return {
      meta: { source: file },
      course: x,
    };
  });

  fs.writeFileSync(
    path.resolve(
      process.cwd(),
      jsonDest,
      `${path.basename(file, '.xml')}${courseTypeToSuffix(courseType)}`
    ),
    JSON.stringify(documentWithMetaData, null, 2)
  );
}
