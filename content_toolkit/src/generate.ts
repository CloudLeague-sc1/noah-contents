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

type CourceType = 'article' | 'sample';

const courceType: CourceType = process.argv[2] as CourceType;
const mediaDest = process.argv[3];
const jsonDest = process.argv[4];
const files = process.argv.slice(5);

const courceTypeToSuffix = (t: CourceType) =>
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
      cource: x,
    };
  });

  fs.writeFileSync(
    path.resolve(
      process.cwd(),
      jsonDest,
      `${path.basename(file, '.xml')}${courceTypeToSuffix(courceType)}`
    ),
    JSON.stringify(documentWithMetaData, null, 2)
  );
}
