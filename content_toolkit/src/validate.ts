import chalk from 'chalk';
import path from 'path';
import { exit } from 'process';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import validator from 'xsd-schema-validator';

// Console features

const printSuccess = (text: string) => {
  console.log(`${chalk.green.bold('[ OK ]')}\t${text}`);
};

const printInfo = (text: string) => {
  console.log(`${chalk.blue.bold('[INFO]')}\t${text}`);
};

const printError = (text: string) => {
  console.log(`${chalk.red.bold('[ERR!]')}\t${text}`);
};

const validateXMLAsync = async (
  target: string | { file: string },
  xsdPath: string
): Promise<{ valid: boolean; messages: string[]; result: string }> => {
  return new Promise((resolve, reject) => {
    validator.validateXML(target, xsdPath, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const process_files = async (): Promise<number> => {
  const files = process.argv.slice(2);

  printInfo(`Target files are  ${files.join()}`);

  let retval = 0;

  for (const file of files) {
    const underlinedFilename = chalk.underline(file);
    printInfo(`Processing file ${underlinedFilename}`);

    const targetDocument = path.resolve(process.cwd(), file);
    const xsdPath = path.resolve(__dirname, '../../schema.xsd');
    retval = await validateXMLAsync({ file: targetDocument }, xsdPath)
      .then((result) => {
        if (result.valid) {
          printSuccess(`${underlinedFilename} is valid`);
          return 0;
        } else {
          printError(`${underlinedFilename} is invalid`);
          return 1;
        }
      })
      .catch((err) => {
        printError(`File ${underlinedFilename} seems to be invalid.`);
        console.log(err.message);

        return 1;
      });
  }

  return retval;
};

console.log(chalk.green('- - - - - - -  Validation Result - - - - - - -'));
process_files().then((retval) => {
  printInfo('Validator finished');
  console.log(chalk.green('- - - - - - - - - - - - - - - - - - - - - - -'));
  exit(retval);
});
