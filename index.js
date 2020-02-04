const fs = require('fs');
const dir = process.argv[2];

fs.copyFile('summary.js', dir + "summary.js", (err) =>{
  if (err) throw err;
  console.log("File was copied to destination")
});
