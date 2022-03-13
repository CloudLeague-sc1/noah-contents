import chalk from 'chalk';
import path from 'path';
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import validator from 'xsd-schema-validator';

// Console features 

const printSuccess = (text)=>{
  console.log(`${chalk.green.bold("[ OK ]")}\t${text}`);
}

const printInfo = (text)=>{
  console.log(`${chalk.blue.bold("[INFO]")}\t${text}`);
}

const printError = (text)=>{
  console.log(`${chalk.red.bold("[ERR!]")}\t${text}`);
}


const validateXMLAsync = async (target, xsdPath)=>{
 return new Promise((resolve,reject)=>{
  validator.validateXML(target, xsdPath,(err,result)=>{
   if (err) {
    reject(err);
  }
  resolve(result)
  })
 })
}


const process_files = async ()=>{

 const files = process.argv.slice(2);

 printInfo(`Target files are  ${files.join()}`);

for (let file of files){
  const underlinedFilename=chalk.underline(file);
  printInfo(`Processing file ${underlinedFilename}`);

  const targetDocument=path.resolve(process.cwd(),file);
  const xsdPath = path.resolve(__dirname,'../schema.xsd');
  await validateXMLAsync({file: targetDocument}, xsdPath).then(result=>{
    if (result.valid){
      printSuccess(`${underlinedFilename} is valid`);
     }else{
      printError(`${underlinedFilename} is invalid`);
     }
  }).catch(err=>{
    printError(`File ${underlinedFilename} seems to be invalid.`);
    console.log(err.message)
  });

}

}


console.log(chalk.green("- - - - - - -  Validation Result - - - - - - -"))
process_files().then(()=>{
 printInfo('Validator finished');
 console.log(chalk.green("- - - - - - - - - - - - - - - - - - - - - - -"))
});
