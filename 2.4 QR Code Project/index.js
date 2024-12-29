import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {message: "Enter the link",
     name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr.png'));
    var svg_string = qr.imageSync('I love QR!', { type: 'png' });
    fs.writeFile("qr.txt",url,(err)=>{
        if(err) throw err;
        console.log("File saved");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      
    } else {
      
    }
  });