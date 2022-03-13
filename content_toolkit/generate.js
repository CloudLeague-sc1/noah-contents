import { XMLParser} from "fast-xml-parser";
import fs from 'fs';
import path from 'path';

if (process.argv.length < 4) {
    console.log("Usage: node generate.js [dest] [files...]");
    process.exit(1);
}

const dest = process.argv[2];
const files = process.argv.slice(3);

for (let file of files){
 const XMLStr = fs.readFileSync(file, 'utf8');
 const parser = new XMLParser();
 let jObj = parser.parse(XMLStr);

 delete jObj['?xml'];
 fs.writeFileSync(path.resolve(process.cwd(),dest,`${path.basename(file,'.xml')}.json`),JSON.stringify(jObj,null,2));
}
