import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import path from 'path';
import { Cource } from './types/XMLTypes';

if (process.argv.length < 4) {
  console.log('Usage: node generate.js [dest] [files...]');
  process.exit(1);
}

import simplifyOputput from './XMLTypeConversion';

const dest = process.argv[2];
const files = process.argv.slice(3);

type CourceDeck = {
  cource: Cource[];
  file: string;
}[];

let cources: CourceDeck = [];

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
  const jObj = parser.parse(XMLStr);
  const result = simplifyOputput(jObj);

  fs.writeFileSync(
    path.resolve(process.cwd(), dest, `${path.basename(file, '.xml')}.json`),
    JSON.stringify(result, null, 2)
  );

  cources = cources.concat({ file, cource: result });
}

fs.writeFileSync(
  path.resolve(process.cwd(), dest, `${path.basename('courcedeck')}.json`),
  JSON.stringify({ cources }, null, 2)
);
