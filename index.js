const fs = require('fs');
const path = process.argv[2];

fs.copyFile('summary.js', path + "summary.js", (err) =>{
  if (err) throw err;
  console.log("File was copied to destination")
});
