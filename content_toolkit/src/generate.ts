import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import path from 'path';

if (process.argv.length < 4) {
  console.log('Usage: node generate.js [dest] [files...]');
  process.exit(1);
}

import simplifyOputput from './XMLTypeConversion';

const dest = process.argv[2];
const files = process.argv.slice(3);

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
}
