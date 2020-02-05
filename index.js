const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
const folder = 'txt';
const newdir = dir + folder;
const copyright = require('./config.json');

function copyFile(fileFrom, fileTo, callback){
  fs.copyFile(fileFrom, fileTo, callback);
}

function callback() {
  return (err) => {
    if (err) throw err;
    console.log("File was copied to destination")
  }
}

fs.exists(dir, (exists) => {
  if (exists){
    copyFile('summary.js', path.join(dir, "summary.js"), callback());

    fs.exists(newdir, (exists) => {
      if (exists) {
        console.error('Directory already exists');
        copytxt();
      } else {
        fs.mkdir(dir + folder, { recursive: true }, (err) => {
          if (err) throw err;
          copytxt();
          console.log("Directory was made to destination")
        });
      }
    });

    function copytxt(){
      fs.readdir(__dirname, function(err, list) {
          if (err) return done(err);

          for (var i = 0; i < list.length; i++) {
            if (path.extname(list[i]) == '.txt'){
              const str = path.join(newdir,  path.basename(list[i]));
              fs.copyFile(path.basename(list[i]), str, (err) =>{
                if (err) throw err;

                fs.appendFile(str, '\r\n' + copyright.copyright, (err) => {
                  if (err) throw err;
                  console.log('File was written');
                });
              });
            }
          }

          fs.watch(newdir, (event, filename) => {
            if (filename) {
              console.log(`${filename} file Changed`);
            }
          });

          console.log("Files (txt) were copied to destination")
      });
    }
  } else {
    console.log("Input params aren't correctly");
  }
});
