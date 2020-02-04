const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
const folder = 'txt';
const newdir = dir + folder;

fs.copyFile('summary.js', dir + "summary.js", (err) =>{
  if (err) throw err;
  console.log("File was copied to destination")
});

fs.exists(dir + folder, (exists) => {
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
          fs.copyFile(path.basename(list[i]), newdir + '/' + path.basename(list[i]), (err) =>{
            if (err) throw err;
          });
        }
      }

      console.log("Files (txt) were copied to destination")
  });
}
